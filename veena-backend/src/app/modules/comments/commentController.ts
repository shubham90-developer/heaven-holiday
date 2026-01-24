import { NextFunction, Request, Response } from 'express';
import { commentSchema } from './commentValidation';
import Comment from './commentModel';

// GET all comments
export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Comments retrieved successfully',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate with Zod
    const validatedData = commentSchema.parse(req.body);

    // Create new comment
    const newComment = new Comment({
      name: validatedData.name,
      comment: validatedData.comment,
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Comment created successfully',
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};
