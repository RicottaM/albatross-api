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

  async getById(req: Request, res: Response) {
    const category = await this.categoryService.getById(Number(req.params.id));
    res.json(category);
  }

  async create(req: Request, res: Response) {
    const category = await this.categoryService.create(req.body);
    res.status(201).json(category);
  }

  async update(req: Request, res: Response) {
    const category = await this.categoryService.update(Number(req.params.id), req.body);
    res.json(category);
  }

  async delete(req: Request, res: Response) {
    await this.categoryService.delete(Number(req.params.id));
    res.status(204).send();
  }
}
