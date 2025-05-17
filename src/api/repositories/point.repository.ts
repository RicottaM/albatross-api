import { injectable } from 'tsyringe';
import prisma from '@/db/DbClient';
import { Prisma } from '@prisma/client';

@injectable()
export class PointRepository {
  async getAll() {
    return prisma.point.findMany();
  }

  async getByName(name: string) {
    return prisma.point.findMany({
      where: { name },
    });
  }

  async create(point: Prisma.PointCreateInput) {
    return prisma.point.create({
      data: point,
    });
  }

  async getById(id: number) {
    return prisma.point.findUnique({
      where: { id },
    });
  }

  async update(id: number, point: Prisma.PointUpdateInput) {
    return prisma.point.update({
      where: { id },
      data: point,
    });
  }

  async delete(id: number) {
    return prisma.point.delete({
      where: { id },
    });
  }
}
