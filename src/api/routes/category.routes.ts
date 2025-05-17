import { container } from 'tsyringe';
import { Router } from 'express';
import { CategoryController } from '@/api/controllers/category.controller';
import { checkToken } from '@/middleware/checkToken';

const categoryRouter = Router();
const controller = container.resolve(CategoryController);

categoryRouter.get('/', checkToken, controller.getAll.bind(controller));
categoryRouter.get('/:id', checkToken, controller.getById.bind(controller));
categoryRouter.post('/', checkToken, controller.create.bind(controller));
categoryRouter.put('/:id', checkToken, controller.update.bind(controller));
categoryRouter.delete('/:id', checkToken, controller.delete.bind(controller));

export default categoryRouter;
