import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(3, 'Name must contain at least 3 characters'),

    department: z.string().min(2, 'Department is required'),

    registerNumber: z
      .string()
      .regex(
        /^(CSE|IT|ECE|EEE|MECH|CIVIL|BCA|MCA)\d{4}\d{3}[A-Z]$/,
        'Register Number must be like CSE2025001A'
      ),

    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        'Invalid email address'
      ),

    password: z.string().min(6, 'Password must contain at least 6 characters'),

    confirmPassword: z.string(),

    age: z.coerce.number().min(17).max(40),

    fatherName: z.string().min(3),

    motherName: z.string().min(3),

    dob: z.string(),

    phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),

    address: z.string().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
