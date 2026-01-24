import express from 'express';
import { upload } from '../../config/cloudinary';
import {
  getManagement,
  updateMainFields,
  addCard,
  updateCard,
  deleteCard,
} from './philosophyController';

const router = express.Router();

router.get('/management', getManagement);

router.patch('/management/main-fields', updateMainFields);

router.post('/management/card', upload.single('image'), addCard);

router.patch('/management/card', upload.single('image'), updateCard);

router.delete('/management/card', deleteCard);

export const philosophyRouter = router;
