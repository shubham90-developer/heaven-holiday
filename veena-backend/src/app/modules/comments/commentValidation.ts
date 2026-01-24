import { z } from 'zod';

export const commentSchema = z.object({
  name: z.string().min(1, 'name is required'),
  comment: z.string().min(1, 'minimum one comment is required'),
});

export type CreateComment = z.infer<typeof commentSchema>;
