import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  async checkIfExists(req: Request, res: Response) {
    const exists = await this.userService.checkIfExists(req.body.login);
    res.json(exists);
  }
}
