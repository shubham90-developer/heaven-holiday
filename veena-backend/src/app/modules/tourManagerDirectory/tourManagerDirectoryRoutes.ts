import express from 'express';
import {
  getTourManagerDirectory,
  updateDirectoryHeading,
  addManager,
  updateManager,
  deleteManager,
} from './tourManagerDirectoryController';

import { upload } from '../../config/cloudinary';

const router = express.Router();

// Get directory with all managers (supports ?search= and ?letter= query params)
router.get('/', getTourManagerDirectory);

// Update directory heading
router.put('/heading', updateDirectoryHeading);

// Add a manager
router.post('/manager', upload.single('image'), addManager);

// Update a manager
router.put('/manager/:managerId', upload.single('image'), updateManager);

// Delete a manager
router.delete('/manager/:managerId', deleteManager);

export const tourManagerTeamRouter = router;
