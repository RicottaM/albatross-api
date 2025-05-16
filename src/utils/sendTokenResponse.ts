import { SetTokenResponseOptions } from '@/types/SetTokenResponseOptions';

export const sendTokenResponse = ({ res, token, type, user }: SetTokenResponseOptions): void => {
  const isProduction = process.env.NODE_ENV === 'production';

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1h
    })
    .status(type === 'register' ? 201 : 200)
    .json({
      message: type === 'register' ? 'User registered.' : 'Login successful.',
      ...(type === 'register' && user ? { user } : {}),
    });
};
