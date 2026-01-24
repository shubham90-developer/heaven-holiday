import express from 'express';
import {
  getHeroBanner,
  updateHeroBanner,
  createHeroBanner,
  deleteHeroBanner,
} from './bannerController';
import { upload } from '../../config/cloudinary';
const router = express.Router();
router.post('/', upload.single('image'), createHeroBanner);
router.get('/', getHeroBanner);
router.put('/', upload.single('image'), updateHeroBanner);
router.delete('/', deleteHeroBanner);

export const heroBannerRouter = router;
