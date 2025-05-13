import { Router } from 'express';
import { CategoryController } from '@/api/controllers/category.controller';

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.get('/categories', controller.getAll.bind(controller));

export default categoryRouter;
