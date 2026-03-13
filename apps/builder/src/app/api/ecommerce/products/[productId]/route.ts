import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

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
    const product = await prisma.product.update({
      where: { id: productId },
      data: body,
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
