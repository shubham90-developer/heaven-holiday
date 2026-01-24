import express from 'express';
import {
  getOnlineBooking,
  updateOnlineBooking,
  createStep,
  updateStep,
  deleteStep,
} from './bookingController';
import { upload } from '../../config/cloudinary';

const router = express.Router();

// Public route - Get online booking content
router.get('/', getOnlineBooking);

// Admin routes - Protected
router.put('/', updateOnlineBooking);

router.post('/steps', upload.single('image'), createStep);

router.put('/steps/:stepNo', upload.single('image'), updateStep);

router.delete('/steps/:stepNo', deleteStep);

export const onlineBookingRouter = router;
