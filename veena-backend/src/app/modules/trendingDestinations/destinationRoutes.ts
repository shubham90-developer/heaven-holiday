import { Router } from 'express';
import {
  updateTitle,
  getTrendingDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from './destinationsController';

import { upload } from '../../config/cloudinary';

const router = Router();

router.put('/title', updateTitle);

router.get('/', getTrendingDestinations);

router.post('/destinations', upload.single('image'), createDestination);

router.put('/destinations/:id', upload.single('image'), updateDestination);

router.delete('/destinations/:id', deleteDestination);

export const trendingDestinationsRouter = router;
