import { injectable } from 'tsyringe';
import prisma from '@/db/DbClient';
import { Prisma } from '@prisma/client';

@injectable()
export class CategoryRepository {
  async getAll() {
    return prisma.category.findMany();
  }

  async getByName(name: string) {
    return prisma.category.findFirst({
      where: { name },
    });
  }

  async create(category: Prisma.CategoryCreateInput) {
    return prisma.category.create({
      data: category,
    });
  }

  async getById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: number, category: Prisma.CategoryUpdateInput) {
    return prisma.category.update({
      where: { id },
      data: category,
    });
  }

  async delete(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
