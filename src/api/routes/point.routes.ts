import { container } from 'tsyringe';
import { Router } from 'express';
import { PointController } from '@/api/controllers/point.controller';
import { checkToken } from '@/middleware/checkToken';
import { validate } from '@/middleware/validate';
import { pointSchema } from '@/api/schemas/point.schema';

const pointRouter = Router();
const controller = container.resolve(PointController);

pointRouter.get('/', checkToken, controller.getAll.bind(controller));
pointRouter.get('/:id', checkToken, controller.getById.bind(controller));
pointRouter.post('/', checkToken, validate(pointSchema), controller.create.bind(controller));
pointRouter.put('/:id', checkToken, validate(pointSchema), controller.update.bind(controller));
pointRouter.delete('/:id', checkToken, controller.delete.bind(controller));

export default pointRouter;
