import { injectable } from 'tsyringe';
import { CategoryRepository } from '@/api/repositories/category.repository';
import { Category } from '@prisma/client';

@injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAll() {
    return this.categoryRepository.getAll();
  }
}
