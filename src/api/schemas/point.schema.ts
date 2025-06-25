import { z } from 'zod';

export const createPointSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(16, 'Name must be at most 16 characters long'),
  latitude: z.number().min(-90, 'Latitude must be at least -90').max(90, 'Latitude must be at most 90'),
  longitude: z.number().min(-180, 'Longitude must be at least -180').max(180, 'Longitude must be at most 180'),
  categoryId: z.number().int('Category ID must be an integer').positive('Category ID must be positive'),
});

export const updatePointSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(30, 'Name must be at most 30 characters long').optional(),
  latitude: z.number().min(-90, 'Latitude must be at least -90').max(90, 'Latitude must be at most 90').optional(),
  longitude: z.number().min(-180, 'Longitude must be at least -180').max(180, 'Longitude must be at most 180').optional(),
  categoryId: z.number().int('Category ID must be an integer').positive('Category ID must be positive').optional(),
});
