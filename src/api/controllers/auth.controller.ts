import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthService } from '@/api/services/auth.service';

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const { login, password } = req.body;
    const user = await this.authService.register(login, password);
    res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { login, password } = req.body;
    const token = await this.authService.login(login, password);
    res.json({ token });
  }
}
