import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { PointService } from '@/api/services/point.service';
import { AppError } from '@/utils/AppError';

@injectable()
export class PointController {
  constructor(private pointService: PointService) {}

  async getAll(req: Request, res: Response) {
    const points = await this.pointService.getAll();
    res.json(points);
  }

  async getByUser(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    if (!userId) {
      throw new AppError('User not authenticated.', 403);
    }
    const points = await this.pointService.getByUser(userId);
    res.json(points);
  }

  async getById(req: Request, res: Response) {
    const point = await this.pointService.getById(Number(req.params.id));
    res.json(point);
  }

  async create(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    if (!userId) {
      throw new AppError('User not authenticated.', 403);
    }
    const point = await this.pointService.create(req.body, userId);
    res.status(201).json(point);
  }

  async update(req: Request, res: Response) {
    const point = await this.pointService.update(Number(req.params.id), req.body);
    res.json(point);
  }

  async delete(req: Request, res: Response) {
    await this.pointService.delete(Number(req.params.id));
    res.status(204).send();
  }
}
