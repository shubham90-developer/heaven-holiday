import express from 'express';

import {
  getOfferBanner,
  updateOfferBanner,
  createOfferBanner,
  deleteOfferBanner,
} from './offer-banner.controller';

import { upload } from '../../config/cloudinary';
const router = express.Router();
router.post('/', upload.single('image'), createOfferBanner);
router.get('/', getOfferBanner);
router.put('/', upload.single('image'), updateOfferBanner);
router.delete('/', deleteOfferBanner);

export const offerBannerRouter = router;
