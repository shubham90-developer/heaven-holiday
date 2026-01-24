import { Router } from 'express';
import {
  getTourReview,
  updateMainFields,
  addReview,
  updateReview,
  deleteReview,
} from './reviewsController';

const router = Router();

router.get('/', getTourReview);

router.put('/update-main', updateMainFields);

router.post('/review/add', addReview);

router.put('/review/update/:id', updateReview);

router.delete('/review/delete/:id', deleteReview);

export const reviewsRouter = router;
