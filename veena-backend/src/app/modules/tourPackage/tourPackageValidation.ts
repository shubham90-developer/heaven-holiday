import { z } from 'zod';

const packageCardSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, 'City name is required')
    .max(100, 'City name must be less than 100 characters'),

  tours: z.number().int().min(0, 'Tours must be a positive number'),

  departures: z.number().int().min(0, 'Departures must be a positive number'),

  price: z
    .string()
    .trim()
    .min(1, 'Price is required')
    .max(50, 'Price must be less than 50 characters'),

  image: z.string().min(1, 'Image is required'),

  badge: z
    .string()
    .trim()
    .max(100, 'Badge text must be less than 100 characters')
    .optional(),

  link: z.string().trim().min(1, 'Link is required').default('/tour-details'),

  cities: z
    .array(z.string().trim().min(1, 'City name cannot be empty'))
    .min(1, 'At least one city is required'),

  days: z.number().int().min(1, 'Days must be at least 1'),

  startOn: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
    message: 'Invalid date format',
  }),

  joinPrice: z
    .string()
    .trim()
    .min(1, 'Join price is required')
    .max(50, 'Join price must be less than 50 characters'),

  status: z.enum(['Active', 'Inactive']).optional().default('Active'),

  order: z.number().int().min(0).optional().default(0),
});

export const createTourPackageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),

  subtitle: z
    .string()
    .trim()
    .min(1, 'Subtitle is required')
    .max(300, 'Subtitle must be less than 300 characters'),

  packages: z.array(packageCardSchema).optional().default([]),
});

export const updateTourPackageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title cannot be empty')
    .max(200, 'Title must be less than 200 characters')
    .optional(),

  subtitle: z
    .string()
    .trim()
    .min(1, 'Subtitle cannot be empty')
    .max(300, 'Subtitle must be less than 300 characters')
    .optional(),

  packages: z.array(packageCardSchema).optional(),
});

export const addPackageCardSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, 'City name is required')
    .max(100, 'City name must be less than 100 characters'),

  tours: z.number().int().min(0, 'Tours must be a positive number'),

  departures: z.number().int().min(0, 'Departures must be a positive number'),

  price: z
    .string()
    .trim()
    .min(1, 'Price is required')
    .max(50, 'Price must be less than 50 characters'),

  image: z.string().min(1, 'Image is required'),

  badge: z
    .string()
    .trim()
    .max(100, 'Badge text must be less than 100 characters')
    .optional(),

  link: z.string().trim().min(1, 'Link is required').default('/tour-details'),

  cities: z
    .array(z.string().trim().min(1, 'City name cannot be empty'))
    .min(1, 'At least one city is required'),

  days: z.number().int().min(1, 'Days must be at least 1'),

  startOn: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
    message: 'Invalid date format',
  }),

  joinPrice: z
    .string()
    .trim()
    .min(1, 'Join price is required')
    .max(50, 'Join price must be less than 50 characters'),

  status: z.enum(['Active', 'Inactive']).optional().default('Active'),

  order: z.number().int().min(0).optional().default(0),
});

export const updatePackageCardSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, 'City name cannot be empty')
    .max(100, 'City name must be less than 100 characters')
    .optional(),

  tours: z.number().int().min(0, 'Tours must be a positive number').optional(),

  departures: z
    .number()
    .int()
    .min(0, 'Departures must be a positive number')
    .optional(),

  price: z
    .string()
    .trim()
    .min(1, 'Price cannot be empty')
    .max(50, 'Price must be less than 50 characters')
    .optional(),

  image: z.string().min(1, 'Image cannot be empty').optional(),

  badge: z
    .string()
    .trim()
    .max(100, 'Badge text must be less than 100 characters')
    .optional()
    .nullable(),

  link: z.string().trim().min(1, 'Link cannot be empty').optional(),

  cities: z
    .array(z.string().trim().min(1, 'City name cannot be empty'))
    .min(1, 'At least one city is required')
    .optional(),

  days: z.number().int().min(1, 'Days must be at least 1').optional(),

  startOn: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
    message: 'Invalid date format',
  }),

  joinPrice: z
    .string()
    .trim()
    .min(1, 'Join price cannot be empty')
    .max(50, 'Join price must be less than 50 characters')
    .optional(),

  status: z.enum(['Active', 'Inactive']).optional(),

  order: z.number().int().min(0).optional(),
});

export type CreateTourPackageInput = z.infer<typeof createTourPackageSchema>;
export type UpdateTourPackageInput = z.infer<typeof updateTourPackageSchema>;
export type AddPackageCardInput = z.infer<typeof addPackageCardSchema>;
export type UpdatePackageCardInput = z.infer<typeof updatePackageCardSchema>;
