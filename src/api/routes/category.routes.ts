import { container } from 'tsyringe';
import { Router } from 'express';
import { CategoryController } from '@/api/controllers/category.controller';

const categoryRouter = Router();
const controller = container.resolve(CategoryController);

categoryRouter.get('/', controller.getAll.bind(controller));

export default categoryRouter;
