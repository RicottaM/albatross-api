import { injectable } from 'tsyringe';
import prisma from '@/db/DbClient';

@injectable()
export class UserRepository {
  async getAll() {
    return prisma.user.findMany();
  }

  async getById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getByLogin(login: string) {
    return prisma.user.findUnique({
      where: { login },
    });
  }

  async create(data: { login: string; passwordHash: string }) {
    return prisma.user.create({
      data,
    });
  }
}
