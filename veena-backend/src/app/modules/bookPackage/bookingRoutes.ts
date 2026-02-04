// routes/bookingRoutes.ts

import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  addPayment,
  cancelBooking,
  getBookingSummary,
  updateBookingTravelers,
  getAllBookings,
  deleteBooking,
  createPaymentOrder,
  verifyPayment,
  handlePaymentFailure,
} from './bookingController';

import { authenticate } from '../../middlewares/firebaseAuth';

const router = express.Router();

router.post('/', authenticate, createBooking);

router.get('/', authenticate, getUserBookings);

router.get('/:bookingId', authenticate, getBookingById);

router.get('/:bookingId/summary', authenticate, getBookingSummary);

router.post(
  '/:bookingId/create-payment-order',
  authenticate,
  createPaymentOrder,
);
router.post('/:bookingId/verify-payment', authenticate, verifyPayment);
router.post('/:bookingId/payment-failure', authenticate, handlePaymentFailure);

router.post('/:bookingId/payment', authenticate, addPayment);

router.patch('/:bookingId/travelers', authenticate, updateBookingTravelers);

router.patch('/:bookingId/cancel', authenticate, cancelBooking);

router.get('/admin/all', getAllBookings);
router.delete('/admin/:bookingId', deleteBooking);

export const bookingRouter = router;
