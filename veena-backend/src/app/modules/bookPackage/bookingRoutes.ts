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
  getAllPendingRefunds,
  updateRefundStatus,
} from './bookingController';

import { authenticate } from '../../middlewares/firebaseAuth';

const router = express.Router();

// ========== ADMIN ROUTES (MUST BE FIRST) ==========
router.get('/admin/all', getAllBookings);
router.get('/admin/refunds/pending', getAllPendingRefunds);
router.patch('/admin/refunds/:bookingId/:refundId/status', updateRefundStatus);
router.delete('/admin/:bookingId', deleteBooking);

// ========== USER ROUTES ==========
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

export const bookingRouter = router;
