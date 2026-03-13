import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id]/time - Get all time entries for a task + total hours
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: taskId } = await params;

    const timeEntries = await prisma.timeEntry.findMany({
      where: { taskId },
      orderBy: { startedAt: 'desc' },
    });

    // Calculate total minutes from completed entries
    let totalMinutes = 0;
    let runningEntry = null;

    for (const entry of timeEntries) {
      if (entry.stoppedAt && entry.duration) {
        totalMinutes += entry.duration;
      } else if (!entry.stoppedAt) {
        runningEntry = entry;
        // Add elapsed time for running entry
        const elapsed = Math.floor(
          (Date.now() - new Date(entry.startedAt).getTime()) / 60000
        );
        totalMinutes += elapsed;
      }
    }

    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    return NextResponse.json({
      entries: timeEntries,
      totalMinutes,
      totalHours,
      runningEntry,
    });
  } catch (error) {
    console.error('Error fetching time entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch time entries' },
      { status: 500 }
    );
  }
}

// POST /api/tasks/[id]/time - Start a new timer
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: taskId } = await params;

    // Check task exists
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Check if there's already a running timer for this task
    const running = await prisma.timeEntry.findFirst({
      where: { taskId, stoppedAt: null },
    });
    if (running) {
      return NextResponse.json(
        { error: 'A timer is already running for this task', runningEntry: running },
        { status: 409 }
      );
    }

    const entry = await prisma.timeEntry.create({
      data: {
        taskId,
        startedAt: new Date(),
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error starting timer:', error);
    return NextResponse.json(
      { error: 'Failed to start timer' },
      { status: 500 }
    );
  }
}

// PATCH /api/tasks/[id]/time - Stop the running timer
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: taskId } = await params;

    // Find the running timer
    const running = await prisma.timeEntry.findFirst({
      where: { taskId, stoppedAt: null },
    });

    if (!running) {
      return NextResponse.json(
        { error: 'No running timer found for this task' },
        { status: 404 }
      );
    }

    const now = new Date();
    const duration = Math.floor(
      (now.getTime() - new Date(running.startedAt).getTime()) / 60000
    );

    const entry = await prisma.timeEntry.update({
      where: { id: running.id },
      data: {
        stoppedAt: now,
        duration: Math.max(duration, 1), // minimum 1 minute
      },
    });

    // Recalculate total for the task
    const allEntries = await prisma.timeEntry.findMany({
      where: { taskId, stoppedAt: { not: null } },
    });
    const totalMinutes = allEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    // Also update actualHours on the task
    await prisma.task.update({
      where: { id: taskId },
      data: { actualHours: totalHours },
    });

    return NextResponse.json({
      entry,
      totalMinutes,
      totalHours,
    });
  } catch (error) {
    console.error('Error stopping timer:', error);
    return NextResponse.json(
      { error: 'Failed to stop timer' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id]/time?entryId=xxx - Delete a time entry
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: taskId } = await params;
    const { searchParams } = new URL(req.url);
    const entryId = searchParams.get('entryId');

    if (!entryId) {
      return NextResponse.json(
        { error: 'entryId query parameter is required' },
        { status: 400 }
      );
    }

    // Verify the entry belongs to this task
    const entry = await prisma.timeEntry.findFirst({
      where: { id: entryId, taskId },
    });

    if (!entry) {
      return NextResponse.json(
        { error: 'Time entry not found for this task' },
        { status: 404 }
      );
    }

    await prisma.timeEntry.delete({ where: { id: entryId } });

    // Recalculate total for the task
    const allEntries = await prisma.timeEntry.findMany({
      where: { taskId, stoppedAt: { not: null } },
    });
    const totalMinutes = allEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    // Update actualHours on the task
    await prisma.task.update({
      where: { id: taskId },
      data: { actualHours: totalHours || null },
    });

    return NextResponse.json({ success: true, totalMinutes, totalHours });
  } catch (error) {
    console.error('Error deleting time entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete time entry' },
      { status: 500 }
    );
  }
}
