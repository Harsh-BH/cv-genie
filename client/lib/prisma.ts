// Import from the correct location based on your schema output setting
import { PrismaClient } from '../lib/generated/index'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
    // Fix the datasources syntax - there was a double curly brace
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
      },
    },
  })

// If we're not in production, attach prisma to the global object
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
