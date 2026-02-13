import { z } from 'zod';

export const officeSchema = z.object({
  city: z.string().min(1, 'City is required').trim(),

  status: z
    .enum(['active', 'inactive'])
    .optional()
    .default('active'),

  forex: z.boolean().optional().default(false),

  address: z.string().min(1, 'Address is required').trim(),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number is too long')
    .regex(
      /^\+?\d+$/,
      'Phone number must contain only digits, optionally starting with +',
    ),

  // ✅ ADD THIS
  mapUrl: z.string().optional().default(''),

  // ✅ ADD THIS
  officeState: z
    .enum(['open', 'closed'])
    .optional()
    .default('open'),

  // ✅ ADD THIS (CRITICAL FIX)
  timings: z
    .array(
      z.object({
        day: z.string(),
        open: z.string(),
        close: z.string(),
        closed: z.boolean(),
      }),
    )
    .optional()
    .default([]),
});

export const createOfficeSchema = officeSchema;

export const updateOfficeSchema = officeSchema.partial();

export type CreateOfficeInput = z.infer<typeof createOfficeSchema>;
export type UpdateOfficeInput = z.infer<typeof updateOfficeSchema>;

