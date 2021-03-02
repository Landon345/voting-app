import { PrismaClient } from "../prisma";

export interface Context {
  prisma: PrismaClient;
}
