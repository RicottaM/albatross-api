import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '@/api/controllers/user.controller';

const userRouter = Router();
const controller = container.resolve(UserController);

userRouter.post('/exists', controller.checkIfExists.bind(controller));

export default userRouter;
