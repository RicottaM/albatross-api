import { PrismaClient } from '@prisma/client';

class DbClient {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DbClient.instance) {
      DbClient.instance = new PrismaClient();
    }
    return DbClient.instance;
  }
}

export default DbClient.getInstance();
