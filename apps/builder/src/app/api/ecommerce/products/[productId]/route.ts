import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  price: z.number().int().min(0).optional(),
  compareAtPrice: z.number().int().min(0).nullable().optional(),
  currency: z.string().optional(),
  sku: z.string().nullable().optional(),
  stock: z.number().int().min(0).optional(),
  trackInventory: z.boolean().optional(),
  isDigital: z.boolean().optional(),
  digitalFileUrl: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  variants: z.array(z.record(z.string(), z.unknown())).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export async function GET(_request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { productId } = await params
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    })
    if (!product) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })
    return NextResponse.json(product)
  } catch (error) {
    console.error('Product get error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { productId } = await params
    const body = await request.json()
    const parsed = updateProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 })
    }
    const product = await prisma.product.update({
      where: { id: productId },
      data: parsed.data as Record<string, unknown>,
      include: { category: true },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { productId } = await params
    await prisma.product.delete({ where: { id: productId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Product delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
