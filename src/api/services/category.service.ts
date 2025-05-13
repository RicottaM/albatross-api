import { CategoryRepository } from '@/api/repositories/category.repository';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async getAllCategories() {
    return this.categoryRepository.getAll();
  }
}
