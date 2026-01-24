// routes/contactfeatures.routes.ts
import express from 'express';
import {
  getContactFeatures,
  createContactFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  updateHighlight,
} from './infoBoxController';

const router = express.Router();

// GET route
router.get('/', getContactFeatures); // Get all contact features

// POST routes
router.post('/', createContactFeatures); // Create contact features document
router.post('/feature', createFeature); // Create new feature

// PUT routes
router.put('/feature/:featureId', updateFeature); // Update specific feature
router.put('/highlight', updateHighlight); // Update highlight section

// DELETE route
router.delete('/feature/:featureId', deleteFeature); // Delete specific feature

export const contactInfoBoxRouter = router;
