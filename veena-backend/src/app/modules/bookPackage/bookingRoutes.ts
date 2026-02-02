// routes/bookingRoutes.ts

import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  addPayment,
  cancelBooking,
  getBookingSummary,
} from './bookingController';

import { authenticate } from '../../middlewares/firebaseAuth';

const router = express.Router();

router.post('/', authenticate, createBooking);

router.get('/', authenticate, getUserBookings);

router.get('/:bookingId', authenticate, getBookingById);

router.get('/:bookingId/summary', authenticate, getBookingSummary);

router.post('/:bookingId/payment', authenticate, addPayment);

router.patch('/:bookingId/cancel', authenticate, cancelBooking);

export const bookingRouter = router;
