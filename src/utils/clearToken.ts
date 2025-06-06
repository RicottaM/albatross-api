import { Response } from 'express';

export const clearToken = (res: Response) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
    })
    .status(200)
    .json({ message: 'Logout successful.' });
};
