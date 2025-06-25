import { container } from 'tsyringe';
import { Router } from 'express';
import { PointController } from '@/api/controllers/point.controller';
import { checkToken } from '@/middleware/checkToken';
import { validate } from '@/middleware/validate';
import { createPointSchema, updatePointSchema } from '@/api/schemas/point.schema';

const pointRouter = Router();
const controller = container.resolve(PointController);

pointRouter.get('/', checkToken, controller.getAll.bind(controller));
pointRouter.get('/user', checkToken, controller.getByUser.bind(controller));
pointRouter.get('/:id', checkToken, controller.getById.bind(controller));
pointRouter.post('/', checkToken, validate(createPointSchema), controller.create.bind(controller));
pointRouter.patch('/:id', checkToken, validate(updatePointSchema), controller.update.bind(controller));
pointRouter.delete('/:id', checkToken, controller.delete.bind(controller));

export default pointRouter;
