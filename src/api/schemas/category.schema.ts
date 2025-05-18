import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(16, 'Name must be at most 16 characters'),
});
