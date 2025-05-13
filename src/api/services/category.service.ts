import { CategoryRepository } from '@/api/repositories/category.repository';
import { Category } from '@prisma/client';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async getAllCategories() {
    return this.categoryRepository.getAll();
  }
}
