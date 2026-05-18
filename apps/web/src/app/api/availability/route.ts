import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/availability
 *
 * Retourne la grille de créneaux libres pour la prise de RDV publique
 * depuis la landing /carte.
 *
 * Fenêtre : 14 jours · 7j/7 · 8h00 → 20h30 (dernier créneau finit 21h00)
 * Créneaux : 30 minutes
 * Min-notice : 1 heure d'avance
 *
 * Réponse :
 *   {
 *     "timezone": "Europe/Paris",
 *     "slots": {
 *       "2026-05-19": ["08:00", "08:30", "09:00", ...],
 *       "2026-05-20": ["10:00", "10:30", ...],
 *       ...
 *     }
 *   }
 *
 * Un créneau est exclu si :
 *   - il est dans le passé (ou < 1h dans le futur)
 *   - il chevauche un Appointment existant (status != 'cancelled')
 */

const DAYS_AHEAD = 30;
const SLOT_MINUTES = 30;
const DAY_START_HOUR = 8;
const DAY_END_HOUR = 21; // dernier slot commence à 20:30
const MIN_NOTICE_HOURS = 24;

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function buildSlotDate(baseDate: Date, hour: number, minute: number): Date {
  const d = new Date(baseDate);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export async function GET(_req: NextRequest) {
  const now = new Date();
  const minBookable = new Date(now.getTime() + MIN_NOTICE_HOURS * 60 * 60 * 1000);

  // Borne supérieure : DAYS_AHEAD jours à partir d'aujourd'hui
  const rangeStart = new Date(now);
  rangeStart.setHours(0, 0, 0, 0);
  const rangeEnd = new Date(rangeStart);
  rangeEnd.setDate(rangeEnd.getDate() + DAYS_AHEAD);

  // Récupère tous les Appointments dans la fenêtre (status non annulé).
  // Si la DB est inaccessible (dev local sans tunnel), on continue avec
  // une liste vide plutôt que de bloquer le UI.
  let appointments: { startTime: Date; endTime: Date }[] = [];
  try {
    appointments = await prisma.appointment.findMany({
      where: {
        startTime: { gte: rangeStart, lt: rangeEnd },
        status: { not: 'cancelled' },
      },
      select: { startTime: true, endTime: true },
    });
  } catch (err) {
    console.warn('[availability] DB unreachable, returning unfiltered slots:', err instanceof Error ? err.message : err);
  }

  const slots: Record<string, string[]> = {};

  for (let dayOffset = 0; dayOffset < DAYS_AHEAD; dayOffset++) {
    const day = new Date(rangeStart);
    day.setDate(day.getDate() + dayOffset);
    const key = dateKey(day);
    const daySlots: string[] = [];

    for (let h = DAY_START_HOUR; h < DAY_END_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        const slotStart = buildSlotDate(day, h, m);
        const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60 * 1000);

        // Skip passé / trop proche
        if (slotStart < minBookable) continue;

        // Skip si chevauche un Appointment existant
        const conflict = appointments.some(
          (a) => a.startTime < slotEnd && a.endTime > slotStart,
        );
        if (conflict) continue;

        daySlots.push(`${pad(h)}:${pad(m)}`);
      }
    }

    if (daySlots.length > 0) {
      slots[key] = daySlots;
    }
  }

  return NextResponse.json({
    timezone: 'Europe/Paris',
    slotMinutes: SLOT_MINUTES,
    slots,
  });
}
