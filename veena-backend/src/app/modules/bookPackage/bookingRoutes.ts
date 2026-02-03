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
} from './bookingController';

import { authenticate } from '../../middlewares/firebaseAuth';

const router = express.Router();

// Create a new booking
router.post('/', authenticate, createBooking);

// Get all user bookings (with optional filters)
router.get('/', authenticate, getUserBookings);

// Get specific booking by ID
router.get('/:bookingId', authenticate, getBookingById);

// Get booking summary (for confirmation page)
router.get('/:bookingId/summary', authenticate, getBookingSummary);

// Add payment to a booking
router.post('/:bookingId/payment', authenticate, addPayment);

// Update traveler information
router.patch('/:bookingId/travelers', authenticate, updateBookingTravelers);

// Cancel a booking
router.patch('/:bookingId/cancel', authenticate, cancelBooking);

router.get('/admin/all', getAllBookings);
router.delete('/admin/:bookingId', deleteBooking);
export const bookingRouter = router;
