import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { Prisma } from '@jlstudio/database'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params

    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        leads: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          include: {
            contact: { select: { id: true, email: true, firstName: true, lastName: true } },
          },
        },
        _count: { select: { leads: true } },
      },
    })

    if (!form) {
      return NextResponse.json({ error: 'Formulaire non trouve' }, { status: 404 })
    }

    return NextResponse.json(form)
  } catch (error) {
    console.error('Form get error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params
    const body = await request.json()
    const { name, fields, settings } = body as {
      name?: string
      fields?: Prisma.InputJsonValue
      settings?: Prisma.InputJsonValue
    }

    const data: Prisma.FormUpdateInput = {}
    if (name !== undefined) data.name = name
    if (fields !== undefined) data.fields = fields
    if (settings !== undefined) data.settings = settings

    const form = await prisma.form.update({
      where: { id: formId },
      data,
    })

    return NextResponse.json(form)
  } catch (error) {
    console.error('Form update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params

    await prisma.form.delete({ where: { id: formId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
