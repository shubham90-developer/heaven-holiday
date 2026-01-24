// routes/travelDealBanner.routes.ts
import express from 'express';

import {
  getTravelDealBanner,
  updateTravelDealBanner,
} from './travelDealControllers';
import { upload } from '../../config/cloudinary';

const router = express.Router();

router.get('/travel-deal-banner', getTravelDealBanner);

router.put(
  '/travel-deal-banner',

  upload.single('image'),
  updateTravelDealBanner,
);

export const travelDealBannerRouter = router;
