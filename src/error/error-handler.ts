import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/error/app-error';

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || 500;
  error.message = error.message || 'An error has occured.';

  if (process.env.NODE_ENV !== 'production') {
    console.error(error.message);
  }

  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
};
