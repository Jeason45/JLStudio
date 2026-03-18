import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  parentId: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
})

export async function GET(_request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  try {
    const { categoryId } = await params
    const category = await prisma.productCategory.findUnique({
      where: { id: categoryId },
      include: { products: true, children: true },
    })
    if (!category) return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Category get error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  try {
    const { categoryId } = await params
    const body = await request.json()
    const parsed = updateCategorySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 })
    }
    const category = await prisma.productCategory.update({
      where: { id: categoryId },
      data: parsed.data,
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Category update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  try {
    const { categoryId } = await params
    await prisma.productCategory.delete({ where: { id: categoryId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Category delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
