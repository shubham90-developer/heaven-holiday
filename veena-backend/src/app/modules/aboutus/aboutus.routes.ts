import express from 'express';
import {
  getAboutUs,
  updateAboutUs
  
} from './aboutus.controller';

import { upload } from '../../config/cloudinary';
const router = express.Router();


router.post('/', upload.single('video'), updateAboutUs);
router.get('/', getAboutUs);

export const aboutusRouter =  router;