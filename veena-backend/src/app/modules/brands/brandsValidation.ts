import { z } from 'zod';

/**
 * Brand
 */
export const brandSchema = z.object({
  name: z.string().min(1),
  industry: z.string().min(1),
  isActive: z.boolean().optional(),
});

/**
 * Industry
 */
export const industrySchema = z.object({
  image: z.string().min(1),
  isActive: z.boolean().optional(),
});

/**
 * Create Brands Section
 */
export const createBrandsSectionSchema = z.object({
  heading: z.string().optional(),
  brands: z.array(brandSchema),
  industries: z.array(industrySchema),
  isActive: z.boolean().optional(),
});

/**
 * Update Brands Section
 */
export const updateBrandsSectionSchema = z.object({
  heading: z.string().optional(),
  brands: z.array(brandSchema).optional(),
  industries: z.array(industrySchema).optional(),
  isActive: z.boolean().optional(),
});

