// validations/tabcards.validation.ts
import { z } from 'zod';

// Validation for creating a new tab card
const createTabCardBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  tours: z
    .number()
    .min(0, 'Tours count cannot be negative')
    .int('Tours must be an integer'),
  departures: z
    .number()
    .min(0, 'Departures count cannot be negative')
    .int('Departures must be an integer'),
  guests: z.string().trim().min(1, 'Guests count is required'),
  image: z.string().trim().min(1, 'Image is required'),
  badge: z
    .string()
    .trim()
    .max(50, 'Badge text cannot exceed 50 characters')
    .optional(),
  link: z.string().trim().min(1, 'Link is required').optional(),
  category: z.enum(['world', 'india']),
  isActive: z.boolean().optional(),
});

export const createTabCardSchema = z.object({
  body: createTabCardBodySchema,
});

// Validation for updating a tab card
const updateTabCardBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .optional(),
  tours: z
    .number()
    .min(0, 'Tours count cannot be negative')
    .int('Tours must be an integer')
    .optional(),
  departures: z
    .number()
    .min(0, 'Departures count cannot be negative')
    .int('Departures must be an integer')
    .optional(),
  guests: z.string().trim().min(1, 'Guests count is required').optional(),
  image: z.string().trim().min(1, 'Image is required').optional(),
  badge: z
    .string()
    .trim()
    .max(50, 'Badge text cannot exceed 50 characters')
    .optional(),
  link: z.string().trim().min(1, 'Link is required').optional(),
  category: z.enum(['world', 'india']).optional(),
  isActive: z.boolean().optional(),
});

export const updateTabCardSchema = z.object({
  params: z.object({
    cardId: z.string().min(1, 'Card ID is required'),
  }),
  body: updateTabCardBodySchema,
});

// Validation for getting cards by category
export const getCardsByCategorySchema = z.object({
  params: z.object({
    category: z.enum(['world', 'india']),
  }),
});

// Type exports
export type CreateTabCardBody = z.infer<typeof createTabCardBodySchema>;
export type UpdateTabCardParams = z.infer<typeof updateTabCardSchema>['params'];
export type UpdateTabCardBody = z.infer<typeof updateTabCardBodySchema>;

export type GetCardsByCategoryParams = z.infer<
  typeof getCardsByCategorySchema
>['params'];
