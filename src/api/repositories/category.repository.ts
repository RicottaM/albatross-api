import prisma from '@/db/DbClient';

export class CategoryRepository {
  async getAll() {
    return prisma.category.findMany();
  }
}
