// careers.route.ts
import express from 'express';

import { upload } from '../../config/cloudinary';
import { getCareers, updateCareers } from './careersControllers';

const router = express.Router();

router.get('/', getCareers);

// Accept both video and thumbnail files
router.put(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  updateCareers,
);

export const careersRouter = router;
