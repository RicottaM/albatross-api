import { z } from 'zod';

export const pointSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(16, 'Name must be at most 16 characters long'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  categoryId: z.number().int().positive(),
});
