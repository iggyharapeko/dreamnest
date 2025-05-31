import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestDream() {
  try {
    // First, get our test user
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    })

    if (!user) {
      throw new Error('Test user not found')
    }

    // Create a test dream for the user
    const dream = await prisma.dream.create({
      data: {
        content: 'I had a wonderful dream about flying over a beautiful ocean at sunset. The clouds were golden, and I could feel the warm breeze against my face.',
        userId: user.id,
      },
    })

    console.log('Test dream created successfully:', {
      id: dream.id,
      content: dream.content,
      createdAt: dream.createdAt,
    })
  } catch (error) {
    console.error('Error creating test dream:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestDream() 