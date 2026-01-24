// routes/excitedtowork.routes.ts
import express from 'express';
import {
  getExcitedToWork,
  updateExcitedToWork,
} from './excitedToWorkControllers';

const router = express.Router();

// GET /api/excitedtowork - Get excited to work content
router.get('/', getExcitedToWork);

// PUT /api/excitedtowork - Update excited to work content
router.put('/', updateExcitedToWork);

export const excitedToWorkRouter = router;
