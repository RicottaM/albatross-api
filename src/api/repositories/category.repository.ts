import { injectable } from 'tsyringe';
import prisma from '@/db/DbClient';

@injectable()
export class CategoryRepository {
  async getAll() {
    return prisma.category.findMany();
  }
}
