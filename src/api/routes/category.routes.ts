import { container } from 'tsyringe';
import { Router } from 'express';
import { checkToken } from '@/middleware/checkToken';
import { validate } from '@/middleware/validate';
import { categorySchema } from '@/api/schemas/category.schema';
import { CategoryController } from '@/api/controllers/category.controller';

const categoryRouter = Router();
const controller = container.resolve(CategoryController);

categoryRouter.get('/', checkToken, controller.getAll.bind(controller));
categoryRouter.get('/:id', checkToken, controller.getById.bind(controller));
categoryRouter.post('/', checkToken, validate(categorySchema), controller.create.bind(controller));
categoryRouter.put('/:id', checkToken, validate(categorySchema), controller.update.bind(controller));
categoryRouter.delete('/:id', checkToken, controller.delete.bind(controller));

export default categoryRouter;
