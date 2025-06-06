import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const messages = result.error.errors.map((err) => err.message + '.');
    res.status(400).json({ messages });
    return;
  }

  req.body = result.data;
  next();
};
