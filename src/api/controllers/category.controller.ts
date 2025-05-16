import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { CategoryService } from '@/api/services/category.service';

@injectable()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async getAll(req: Request, res: Response) {
    const categories = await this.categoryService.getAll();
    res.json(categories);
  }
}
