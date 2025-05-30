import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { UserRepository } from '@/api/repositories/user.repository';
import { AppError } from '@/utils/AppError';

@injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: number) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new AppError(`User with id "${id}" not found.`, 404);
    }

    return user;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  async register(login: string, password: string) {
    const existingUser = await this.userRepository.getByLogin(login);

    if (existingUser) {
      throw new AppError('Login taken.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ login, passwordHash: hashedPassword });

    return user;
  }

  async login(login: string, password: string) {
    const user = await this.userRepository.getByLogin(login);

    if (!user) {
      throw new AppError(`User not found.`, 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Wrong password.', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new AppError('No JWT Secret in env.', 500);
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    return token;
  }
}
