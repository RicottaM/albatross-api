import { injectable } from 'tsyringe';
import { UserRepository } from '@/api/repositories/user.repository';
import { Prisma } from '@prisma/client';
import { AppError } from '@/utils/AppError';

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async checkIfExists(login: string) {
    const user = await this.userRepository.getByLogin(login);
    return !!user;
  }
}
