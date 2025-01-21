import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaClientOrTransaction = Prisma.TransactionClient | PrismaClient;
