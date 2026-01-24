// routes/tabcards.routes.ts
import express from 'express';
import {
  getAllTabCards,
  getCardsByCategory,
  createTabCard,
  updateTabCard,
  deleteTabCard,
} from './tabcardController';

import { upload } from '../../config/cloudinary';

const router = express.Router();

// GET routes
router.get('/', getAllTabCards); // Get all cards
router.get('/category/:category', getCardsByCategory); // Get cards by category (world/india)

// POST route
router.post('/', upload.single('image'), createTabCard); // Create new card with image

// PUT route
router.put('/', upload.single('image'), updateTabCard); // Update card with optional new image

// DELETE route
router.delete('/', deleteTabCard); // Delete card

export const tabCardRouter = router;
