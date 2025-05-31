import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { content, userId } = await req.json()

    const dream = await prisma.dream.create({
      data: {
        content,
        userId,
      },
    })

    return NextResponse.json(dream)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating dream' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const dreams = await prisma.dream.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(dreams)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching dreams' },
      { status: 500 }
    )
  }
} 