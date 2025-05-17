import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError('Token missing.', 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError('No JWT Secret in env.', 500);
  }

  jwt.verify(token, secret, (err: VerifyErrors | null) => {
    if (err) {
      throw new AppError('Token expired or invalid.', 401);
    }
    next();
  });
};
