import { z } from 'zod';

export const registerSchema = z.object({
  login: z
    .string()
    .min(3, 'Login must be at least 3 characters long')
    .max(16, 'Login must be at most 16 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Login can only contain letters, numbers and underscores'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
