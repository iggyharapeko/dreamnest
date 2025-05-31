import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.dream.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Dream deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting dream' },
      { status: 500 }
    )
  }
} 