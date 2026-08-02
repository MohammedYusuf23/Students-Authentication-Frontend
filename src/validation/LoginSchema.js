import { z } from 'zod';

export const loginSchema = z.object({
  registerNumber: z.string().min(1, 'Register Number is required'),

  password: z.string().min(1, 'Password is required'),
});
