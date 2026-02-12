import { Router } from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createTourPackageCard,
  getTourPackageCards,
  updateTourPackageCard,
  deleteTourPackageCard,
} from './tourPackageControllers';
import { upload } from '../../config/cloudinary';

const router = Router();

router.post('/categories', upload.single('image'), createCategory);
router.get('/categories', getCategories);
router.put('/categories/:categoryId', upload.single('image'), updateCategory);
router.delete('/categories/:categoryId', deleteCategory);

router.post(
  '/',
  upload.array('galleryImages', 10),
  createTourPackageCard,
);
router.get('/tour-package-cards', getTourPackageCards);
router.put(
  '/tour-package-cards/:cardId',
  upload.array('galleryImages', 10),
  updateTourPackageCard,
);
router.delete('/tour-package-cards/:cardId', deleteTourPackageCard);

export const tourPackageRouter = router;
