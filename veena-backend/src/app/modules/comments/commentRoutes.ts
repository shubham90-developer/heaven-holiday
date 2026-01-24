import express from 'express';
import { getAllComments, createComment } from './commentController';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', createComment);

export const commentRouter = router;
