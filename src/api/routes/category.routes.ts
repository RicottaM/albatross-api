import { container } from 'tsyringe';
import { Router } from 'express';
import { CategoryController } from '@/api/controllers/category.controller';
import { checkToken } from '@/middleware/checkToken';

const categoryRouter = Router();
const controller = container.resolve(CategoryController);

categoryRouter.get('/', checkToken, controller.getAll.bind(controller));

export default categoryRouter;
