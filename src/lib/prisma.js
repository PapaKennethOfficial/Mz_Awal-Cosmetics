import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ['query'],
    });
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({}, {
  get(target, prop) {
    return getPrisma()[prop];
  }
});
