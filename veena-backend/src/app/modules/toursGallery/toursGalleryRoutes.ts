// routes/toursGalleryRoutes.ts
import { Router } from 'express';
import {
  getGallery,
  createGallery,
  updateGallery,
  getImages,
  uploadImage,
  addImage,
  updateImage,
  updateImageWithUpload,
  deleteImage,
} from './toursGalleryControllers';
import { upload } from '../../config/cloudinary';

const router = Router();

// Gallery routes
router.get('/gallery', getGallery);
router.post('/gallery', createGallery);
router.patch('/gallery', updateGallery);

// Image routes
router.get('/gallery/images', getImages);

// Upload image to Cloudinary (NEW - with file upload)
router.post('/gallery/images/upload', upload.single('image'), uploadImage);

// Add image with URL (without file upload)
router.post('/gallery/images', addImage);

// Update image with file upload (NEW - replace image file)
router.patch(
  '/gallery/images/:imageId/upload',
  upload.single('image'),
  updateImageWithUpload,
);

// Update image without file upload (metadata only)
router.patch('/gallery/images/:imageId', updateImage);

// Delete image (auto-deletes from Cloudinary)
router.delete('/gallery/images/:imageId', deleteImage);

export const toursGalleryRouter = router;
