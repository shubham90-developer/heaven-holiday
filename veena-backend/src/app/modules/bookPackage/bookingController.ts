// controllers/bookingController.ts

import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../middlewares/firebaseAuth';
import { appError } from '../../errors/appError';

import { Booking } from './bookingModel';
import { TourPackageCard } from '../tourPackage/tourPackageModel';
import { User } from '../auth/auth.model';
import { createBookingSchema, addPaymentSchema } from './bookingValidation';

// Generate unique booking ID
const generateBookingId = async (): Promise<string> => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Get count of bookings today
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const todayBookingsCount = await Booking.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  const sequence = String(todayBookingsCount + 1).padStart(4, '0');
  return `BK${year}${month}${day}${sequence}`;
};

// Create Booking
export const createBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;

    // Validate request body
    const validatedData = createBookingSchema.parse(req.body);

    // Find user
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found. Please login.', 404));
    }

    // Find tour package
    const tourPackage = await TourPackageCard.findById(
      validatedData.tourPackage,
    );
    if (!tourPackage) {
      return next(new appError('Tour package not found', 404));
    }

    // Find the specific departure
    const departure = tourPackage.departures.find(
      (dep) =>
        dep._id?.toString() === validatedData.selectedDeparture.departureId,
    );

    if (!departure) {
      return next(new appError('Selected departure not found', 404));
    }

    // Check if departure date has passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(departure.date) < today) {
      return next(new appError('Cannot book past departure dates', 400));
    }

    // Check seat availability
    const totalTravelers = validatedData.travelerCount.total;
    if (departure.availableSeats < totalTravelers) {
      return next(
        new appError(
          `Only ${departure.availableSeats} seats available. You requested ${totalTravelers} seats.`,
          400,
        ),
      );
    }

    // Check departure status
    if (departure.status === 'Sold Out' || departure.status === 'Cancelled') {
      return next(new appError(`This departure is ${departure.status}`, 400));
    }

    // Generate booking ID
    const bookingId = await generateBookingId();

    // Set balance payment due date (15 days before departure)
    const balancePaymentDueDate = new Date(departure.date);
    balancePaymentDueDate.setDate(balancePaymentDueDate.getDate() - 15);

    // Create booking
    const booking = await Booking.create({
      bookingId,
      user: user._id,
      tourPackage: tourPackage._id,
      selectedDeparture: validatedData.selectedDeparture,
      travelers: validatedData.travelers,
      travelerCount: validatedData.travelerCount,
      pricing: validatedData.pricing,
      balancePaymentDueDate,
      bookingStatus: 'Pending',
      paymentStatus: 'Pending',
      payments: [],
    });

    // Update available seats
    departure.availableSeats -= totalTravelers;

    // Update departure status based on remaining seats
    const occupancyPercentage =
      ((departure.totalSeats - departure.availableSeats) /
        departure.totalSeats) *
      100;

    if (departure.availableSeats === 0) {
      departure.status = 'Sold Out';
    } else if (occupancyPercentage >= 70) {
      departure.status = 'Filling Fast';
    } else {
      departure.status = 'Available';
    }

    await tourPackage.save();

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate(
        'tourPackage',
        'title subtitle days nights route cityDetails departures',
      );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Booking created successfully',
      data: {
        booking: populatedBooking,
        nextStep: 'payment',
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Get User's Bookings
export const getUserBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    const { status, page = 1, limit = 10 } = req.query;

    const query: any = { user: user._id };

    if (status) {
      query.bookingStatus = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const bookings = await Booking.find(query)
      .populate(
        'tourPackage',
        'title subtitle days nights route cityDetails galleryImages departures',
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: {
        bookings,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Get Booking Details by ID
export const getBookingById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    })
      .populate('user', 'name email phone')
      .populate(
        'tourPackage',
        'title subtitle days nights route cityDetails galleryImages departures itinerary',
      );

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking details retrieved successfully',
      data: booking,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Add Payment to Booking
export const addPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;

    // Validate payment data
    const validatedPayment = addPaymentSchema.parse(req.body);

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    });

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Check if booking is cancelled
    if (booking.bookingStatus === 'Cancelled') {
      return next(new appError('Cannot add payment to cancelled booking', 400));
    }

    // Check if already fully paid
    if (booking.paymentStatus === 'Fully Paid') {
      return next(new appError('Booking is already fully paid', 400));
    }

    // Check if payment amount exceeds pending amount
    if (validatedPayment.amount > booking.pricing.pendingAmount) {
      return next(
        new appError(
          `Payment amount (₹${validatedPayment.amount}) exceeds pending amount (₹${booking.pricing.pendingAmount})`,
          400,
        ),
      );
    }

    // Add payment to payments array
    booking.payments.push(validatedPayment);

    // Update payment status
    booking.updatePaymentStatus();

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('tourPackage', 'title subtitle days nights');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Payment added successfully',
      data: {
        booking: updatedBooking,
        paymentStatus: booking.paymentStatus,
        remainingAmount: booking.pricing.pendingAmount,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Cancel Booking
export const cancelBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;
    const { reason } = req.body;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    }).populate('tourPackage');

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Check if already cancelled
    if (booking.bookingStatus === 'Cancelled') {
      return next(new appError('Booking is already cancelled', 400));
    }

    // Check if already completed
    if (booking.bookingStatus === 'Completed') {
      return next(new appError('Cannot cancel completed booking', 400));
    }

    // Update booking status
    booking.bookingStatus = 'Cancelled';
    await booking.save();

    // Restore seats to tour package
    const tourPackage = await TourPackageCard.findById(booking.tourPackage);
    if (tourPackage) {
      const departure = tourPackage.departures.find(
        (dep) =>
          dep._id?.toString() ===
          booking.selectedDeparture.departureId.toString(),
      );

      if (departure) {
        departure.availableSeats += booking.travelerCount.total;

        // Update departure status
        const occupancyPercentage =
          ((departure.totalSeats - departure.availableSeats) /
            departure.totalSeats) *
          100;

        if (departure.availableSeats === 0) {
          departure.status = 'Sold Out';
        } else if (occupancyPercentage >= 70) {
          departure.status = 'Filling Fast';
        } else {
          departure.status = 'Available';
        }

        await tourPackage.save();
      }
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking cancelled successfully',
      data: {
        bookingId: booking.bookingId,
        status: booking.bookingStatus,
        reason: reason || 'No reason provided',
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Get Booking Summary (for confirmation page)
export const getBookingSummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    })
      .populate(
        'tourPackage',
        'title subtitle days nights route cityDetails galleryImages',
      )
      .select(
        'bookingId selectedDeparture travelers travelerCount leadTraveler pricing paymentStatus bookingStatus payments createdAt balancePaymentDueDate',
      );

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking summary retrieved successfully',
      data: booking,
    });
    return;
  } catch (error) {
    next(error);
  }
};
