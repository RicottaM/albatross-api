import { injectable } from 'tsyringe';
import { CategoryRepository } from '@/api/repositories/category.repository';
import { Prisma } from '@prisma/client';
import { AppError } from '@/utils/AppError';

@injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAll() {
    return this.categoryRepository.getAll();
  }

  async create(category: Prisma.CategoryCreateInput) {
    const existing = await this.categoryRepository.getByName(category.name);

    if (existing) {
      throw new AppError(`Category "${category.name}" already exists.`, 409);
    }

    return this.categoryRepository.create(category);
  }

  async getById(id: number) {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      throw new AppError(`Category with id "${id}" not found.`, 404);
    }

    return category;
  }

  async update(id: number, category: Prisma.CategoryUpdateInput) {
    const existing = await this.categoryRepository.getById(id);

    if (!existing) {
      throw new AppError(`Category with id "${id}" not found.`, 404);
    }

    return this.categoryRepository.update(id, category);
  }

  async delete(id: number) {
    const existing = await this.categoryRepository.getById(id);

    if (!existing) {
      throw new AppError(`Category with id "${id}" not found.`, 404);
    }

    return this.categoryRepository.delete(id);
  }
}
