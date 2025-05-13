import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  private categoryService = new CategoryService();

  async getAll(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }
}
