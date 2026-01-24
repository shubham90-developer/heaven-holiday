import express from 'express';
import {
  getTourPackage,
  updateTitleSubtitle,
  addPackageCard,
  updatePackageCard,
  deletePackageCard,
} from './tourPackageControllers';

import { upload } from '../../config/cloudinary';

const router = express.Router();

// Get tour package with all cards
router.get('/', getTourPackage);

// Update title and subtitle
router.put('/title-subtitle', updateTitleSubtitle);

// Add a package card
router.post('/package', upload.single('image'), addPackageCard);

// Update a package card
router.put('/package/:packageId', upload.single('image'), updatePackageCard);

// Delete a package card
router.delete('/package/:packageId', deletePackageCard);

export const tourPackageRouter = router;
