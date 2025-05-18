import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
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

  jwt.verify(token, secret, (error: VerifyErrors | null, decoded?: string | JwtPayload) => {
    if (error || typeof decoded === 'string') {
      throw new AppError('Invalid token.', 401);
    }
    (req as any).user = { id: decoded?.userId };
    next();
  });
};
