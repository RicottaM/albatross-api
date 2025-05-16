import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthService } from '@/api/services/auth.service';
import { sendTokenResponse } from '@/utils/sendTokenResponse';

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

  async logout(req: Request, res: Response) {
    res
      .cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
      })
      .status(200)
      .json({ message: 'Logout successful.' });
  }
}
