import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '@/api/controllers/auth.controller';

const authRouter = Router();
const controller = container.resolve(AuthController);

authRouter.post('/register', controller.register.bind(controller));
authRouter.post('/login', controller.login.bind(controller));

export default authRouter;
