// routes/annualReturn.routes.ts
import express from 'express';
import {
  getAnnualReturn,
  addItem,
  updateItem,
  deleteItem,
} from './returnController';
import { upload } from '../../config/cloudinary';

const router = express.Router();

router.get('/annual-return', getAnnualReturn);

router.post('/annual-return/item', upload.single('pdf'), addItem);

router.put(
  '/annual-return/item/:itemId',

  upload.single('pdf'),
  updateItem,
);

router.delete('/annual-return/item/:itemId', deleteItem);

export const annualReturnRouter = router;
