import { injectable } from 'tsyringe';
import { Prisma } from '@prisma/client';
import prisma from '@/db/DbClient';

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

  async create(point: Prisma.PointCreateInput, userId: number) {
    return prisma.point.create({
      data: {
        ...point,
        userPoints: {
          create: {
            userId,
          },
        },
      },
    });
  }

  async getById(id: number) {
    return prisma.point.findUnique({
      where: { id },
    });
  }

  async getByUser(userId: number) {
    return prisma.userPoint.findMany({
      where: { userId },
      include: {
        point: {
          include: {
            category: true,
          },
        },
      },
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
