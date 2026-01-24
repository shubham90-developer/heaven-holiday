import express from 'express';
import { upload } from '../../config/cloudinary';
import {
  getAllMain,
  createMain,
  updateMainFields,
  updateMainItem,
  updateMainItemsArray,
  deleteMain,
} from './servicesController';

const router = express.Router();

// Get all main data
router.get('/', getAllMain);

// Create new main
router.post('/', upload.single('icon'), createMain);

// Update only main fields (title, subtitle) - does NOT touch items
router.patch('/:id/fields', upload.none(), updateMainFields);

// Update a specific item in the items array
router.patch('/:id/items/:itemIndex', upload.single('icon'), updateMainItem);

// Update entire items array
router.patch('/:id/items', upload.single('icon'), updateMainItemsArray);

// Delete main
router.delete('/:id', deleteMain);

export const servicesRouter = router;
