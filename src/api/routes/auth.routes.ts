import { Router } from 'express';
import { container } from 'tsyringe';
import { checkToken } from '@/middleware/checkToken';
import { validate } from '@/middleware/validate';
import { registerSchema } from '@/api/schemas/register.schema';
import { AuthController } from '@/api/controllers/auth.controller';

const authRouter = Router();
const controller = container.resolve(AuthController);

authRouter.get('/current', checkToken, controller.getById.bind(controller));
authRouter.post('/register', validate(registerSchema), controller.register.bind(controller));
authRouter.post('/login', controller.login.bind(controller));
authRouter.post('/logout', checkToken, controller.logout.bind(controller));

export default authRouter;
