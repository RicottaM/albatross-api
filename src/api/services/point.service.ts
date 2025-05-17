import { injectable } from 'tsyringe';
import { PointRepository } from '@/api/repositories/point.repository';
import { Prisma } from '@prisma/client';
import { AppError } from '@/utils/classes/AppError';

@injectable()
export class PointService {
  constructor(private pointRepository: PointRepository) {}

  async getAll() {
    return this.pointRepository.getAll();
  }

  async create(point: Prisma.PointCreateInput) {
    return this.pointRepository.create(point);
  }

  async getById(id: number) {
    const point = await this.pointRepository.getById(id);

    if (!point) {
      throw new AppError(`Point with id "${id}" not found.`, 404);
    }

    return point;
  }

  async update(id: number, point: Prisma.PointUpdateInput) {
    const existing = await this.pointRepository.getById(id);

    if (!existing) {
      throw new AppError(`Point with id "${id}" not found.`, 404);
    }

    return this.pointRepository.update(id, point);
  }

  async delete(id: number) {
    const existing = await this.pointRepository.getById(id);

    if (!existing) {
      throw new AppError(`Point with id "${id}" not found.`, 404);
    }

    return this.pointRepository.delete(id);
  }
}
