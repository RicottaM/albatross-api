import { Router } from 'express';
import { container } from 'tsyringe';
import { checkToken } from '@/middleware/checkToken';
import { AuthController } from '@/api/controllers/auth.controller';

const authRouter = Router();
const controller = container.resolve(AuthController);

authRouter.post('/register', controller.register.bind(controller));
authRouter.post('/login', controller.login.bind(controller));
authRouter.post('/logout', checkToken, controller.logout.bind(controller));

export default authRouter;
