// routes/celebrate.routes.ts
import express from 'express';
import {
  getCelebrate,
  updateMainFields,
  addSlide,
  updateSlide,
  deleteSlide,
} from './offer-bannerController';

import { upload } from '../../config/cloudinary';

const router = express.Router();

router.get('/celebrate', getCelebrate);

router.put('/celebrate/main-fields', updateMainFields);

router.post('/celebrate/slide', upload.single('image'), addSlide);

router.put('/celebrate/slide/:slideId', upload.single('image'), updateSlide);

router.delete('/celebrate/slide/:slideId', deleteSlide);

export const celebrateRouter = router;
