import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/classes/AppError';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError('Token missing.', 401);
  }

  if (!process.env.SECRET) {
    throw new AppError('No JWT Secret in env.', 500);
  }

  jwt.verify(token, String(process.env.SECRET), (err: VerifyErrors | null) => {
    if (err) {
      throw new AppError('Token expired or invalid.', 401);
    }
    next();
  });
};
