import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash('test123', 10)
    
    const user = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
      },
    })

    console.log('Test user created successfully:', {
      id: user.id,
      username: user.username,
      email: user.email,
    })
  } catch (error) {
    console.error('Error creating test user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser() 