import { Response } from 'express';
import { AuthResponseType } from '@/types/AuthResponseType';
import { User } from '@prisma/client';

export type SetTokenResponseOptions = {
  res: Response;
  token: string;
  type: AuthResponseType;
  user?: User;
};
