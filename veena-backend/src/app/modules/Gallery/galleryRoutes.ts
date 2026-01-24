import express from 'express';
import {
  getGallery,
  updateGalleryInfo,
  addImageToGallery,
  deleteImageFromGallery,
  updateImageStatus,
} from './galleryController';
import { upload } from '../../config/cloudinary';

const router = express.Router();

router.get('/', getGallery);
router.put('/info', updateGalleryInfo);
router.post('/image', upload.single('image'), addImageToGallery);
router.delete('/image', deleteImageFromGallery);
router.put('/image/status', updateImageStatus);

export const galleryRouter = router;
