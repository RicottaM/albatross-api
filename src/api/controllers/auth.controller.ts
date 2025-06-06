import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthService } from '@/api/services/auth.service';
import { sendTokenResponse } from '@/utils/sendTokenResponse';
import { clearToken } from '@/utils/clearToken';
import { AppError } from '@/utils/AppError';

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const { login, password } = req.body;
    const user = await this.authService.register(login, password);
    const token = await this.authService.login(login, password);
    sendTokenResponse({ res, token, type: 'register', user });
  }

  async login(req: Request, res: Response) {
    const { login, password } = req.body;
    const token = await this.authService.login(login, password);
    sendTokenResponse({ res, token, type: 'login' });
  }

  async getById(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const user = await this.authService.getById(userId);
    res.json({ login: user.login });
  }

  async logout(req: Request, res: Response) {
    clearToken(res);
  }
}
