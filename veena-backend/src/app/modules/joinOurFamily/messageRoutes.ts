// routes/contentRoutes.ts
import express from 'express';
import { getContent, updateContent } from './messageController';

const router = express.Router();

router.get('/', getContent);

router.put('/', updateContent);

export const joinUsRouter = router;
