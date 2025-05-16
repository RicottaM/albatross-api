import logger from '@/config/logger';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/classes/AppError';

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || 500;
  error.message = error.message || 'An error has occured.';

  if (process.env.NODE_ENV !== 'production') {
    logger.error(`[error-handler]: ${error.message}`);
  }

  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
};
