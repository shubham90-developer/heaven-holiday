// controllers/bookingController.ts

import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../middlewares/firebaseAuth';
import { appError } from '../../errors/appError';

import { Booking } from './bookingModel';
import { TourPackageCard } from '../tourPackage/tourPackageModel';
import { User } from '../auth/auth.model';
import {
  createBookingSchema,
  addPaymentSchema,
  updateBookingTravelersSchema,
} from './bookingValidation';
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
} from '../../config/razorpay';
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
    const existingBooking = await Booking.findOne({
      user: user._id,
      tourPackage: validatedData.tourPackage,
      'selectedDeparture.departureId':
        validatedData.selectedDeparture.departureId,
      bookingStatus: { $ne: 'Cancelled' },
    });

    if (existingBooking) {
      return next(
        new appError('You already have a booking for this departure', 400),
      );
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
      // payments: [],
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
      .populate({
        path: 'tourPackage',
        select:
          '_id title badge tourType days baseFullPackagePrice tourManagerIncluded category tourIncludes states metadata',
        populate: [
          {
            path: 'category',
            select: 'image',
          },
          {
            path: 'tourIncludes',
            select: '_id title image status',
          },
          {
            path: 'states',
            select: 'cities',
          },
        ],
      })
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

export const cancelBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;

    // Find user
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    // Find booking
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

    // Check if departure date has passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const departureDate = new Date(booking.selectedDeparture.departureDate);
    departureDate.setHours(0, 0, 0, 0);

    if (departureDate < today) {
      return next(
        new appError('Cannot cancel booking for past departures', 400),
      );
    }

    // Optional: Check cancellation deadline (e.g., 7 days before departure)
    const cancellationDeadline = new Date(departureDate);
    cancellationDeadline.setDate(cancellationDeadline.getDate() - 7);

    if (today > cancellationDeadline) {
      return next(
        new appError(
          'Cancellation deadline has passed (7 days before departure). Please contact support for assistance.',
          400,
        ),
      );
    }

    // Check if any payment has been made
    const hasPayment = booking.pricing.paidAmount > 0;
    const refundAmount = booking.pricing.paidAmount;

    // Update booking status to Cancelled
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
        // Restore seats
        departure.availableSeats += booking.travelerCount.total;

        // Update departure status based on new availability
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

    // Prepare response
    const responseData = {
      bookingId: booking.bookingId,
      status: booking.bookingStatus,
      seatsRestored: booking.travelerCount.total,
      refundInfo: hasPayment
        ? {
            refundAmount,
            refundStatus: 'Pending',
            message:
              'Refund will be processed within 7-10 business days according to our cancellation policy.',
          }
        : null,
    };

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking cancelled successfully',
      data: responseData,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateBookingTravelers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;

    // Validate request body
    const validatedData = updateBookingTravelersSchema.parse(req.body);

    // Find user
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    // Find booking with tour package populated
    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    }).populate('tourPackage');

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Check if booking is cancelled
    if (booking.bookingStatus === 'Cancelled') {
      return next(
        new appError('Cannot update travelers for cancelled booking', 400),
      );
    }

    // Check if booking is completed
    if (booking.bookingStatus === 'Completed') {
      return next(
        new appError('Cannot update travelers for completed booking', 400),
      );
    }

    // Check if departure date has passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const departureDate = new Date(booking.selectedDeparture.departureDate);
    departureDate.setHours(0, 0, 0, 0);

    if (departureDate < today) {
      return next(
        new appError('Cannot update travelers for past departures', 400),
      );
    }

    // Optional: Check update deadline (e.g., 3 days before departure)
    const updateDeadline = new Date(departureDate);
    updateDeadline.setDate(updateDeadline.getDate() - 3);

    if (today > updateDeadline) {
      return next(
        new appError(
          'Update deadline has passed (3 days before departure). Please contact support for assistance.',
          400,
        ),
      );
    }

    // ========== CALCULATE TRAVELER COUNT CHANGES ==========
    const oldTotal = booking.travelerCount.total;
    const newTotal = validatedData.travelers.length;
    const seatDifference = newTotal - oldTotal;

    // Count travelers by type in the new data
    const newCounts = {
      adults: validatedData.travelers.filter((t) => t.type === 'Adult').length,
      children: validatedData.travelers.filter((t) => t.type === 'Child')
        .length,
      infants: validatedData.travelers.filter((t) => t.type === 'Infant')
        .length,
    };

    // ========== HANDLE SEAT CHANGES ==========
    const tourPackage = await TourPackageCard.findById(booking.tourPackage);
    if (!tourPackage) {
      return next(new appError('Tour package not found', 404));
    }

    // Find the specific departure
    const departure = tourPackage.departures.find(
      (dep) =>
        dep._id?.toString() ===
        booking.selectedDeparture.departureId.toString(),
    );

    if (!departure) {
      return next(new appError('Departure not found', 404));
    }

    // If ADDING travelers (need more seats)
    if (seatDifference > 0) {
      // Check if enough seats are available
      if (departure.availableSeats < seatDifference) {
        return next(
          new appError(
            `Only ${departure.availableSeats} seats available. You need ${seatDifference} more seats.`,
            400,
          ),
        );
      }

      // Deduct seats from available seats
      departure.availableSeats -= seatDifference;
    }

    // If REMOVING travelers (free up seats)
    if (seatDifference < 0) {
      // Add seats back to available seats
      departure.availableSeats += Math.abs(seatDifference);
    }

    // Update departure status based on new availability
    if (seatDifference !== 0) {
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
    }

    // ========== RECALCULATE PRICING ==========
    let pricingChanged = false;
    let oldTotalAmount = booking.pricing.totalAmount;
    let newTotalAmount = oldTotalAmount;

    // Only recalculate if total traveler count changed
    if (newTotal !== oldTotal) {
      // Get price per person from the booking (stored during creation)
      const pricePerPerson = booking.pricing.pricePerPerson;

      if (!pricePerPerson) {
        return next(new appError('Price per person not found in booking', 400));
      }

      // Calculate new total amount (same price for everyone)
      newTotalAmount = newTotal * pricePerPerson;

      pricingChanged = true;
    }

    // ========== VALIDATE LEAD TRAVELER ==========
    const leadTravelerCount = validatedData.travelers.filter(
      (t) => t.isLeadTraveler,
    ).length;

    if (leadTravelerCount === 0) {
      return next(
        new appError(
          'At least one traveler must be marked as lead traveler',
          400,
        ),
      );
    }

    if (leadTravelerCount > 1) {
      return next(
        new appError('Only one traveler can be marked as lead traveler', 400),
      );
    }

    // ========== UPDATE BOOKING ==========

    // Convert date strings to Date objects
    const processedTravelers = validatedData.travelers.map((traveler) => ({
      ...traveler,
      dateOfBirth:
        typeof traveler.dateOfBirth === 'string'
          ? new Date(traveler.dateOfBirth)
          : traveler.dateOfBirth,
    }));

    // Update travelers
    booking.travelers = processedTravelers;

    // Update traveler counts
    booking.travelerCount = {
      adults: newCounts.adults,
      children: newCounts.children,
      infants: newCounts.infants,
      total: newTotal,
    };

    // Update pricing if changed
    if (pricingChanged) {
      booking.pricing.totalAmount = newTotalAmount;

      // Recalculate pending amount (total - already paid)
      booking.pricing.pendingAmount =
        newTotalAmount - booking.pricing.paidAmount;

      // If pending amount is negative (user overpaid), handle it
      if (booking.pricing.pendingAmount < 0) {
        booking.pricing.pendingAmount = 0;
        // You might want to add logic here for refund processing
      }
    }
    await booking.save();

    // Save tour package with updated seats
    await tourPackage.save();

    // Populate and return updated booking
    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('tourPackage', 'title subtitle days nights');

    // Prepare response with detailed information
    const responseData = {
      booking: updatedBooking,
      changes: {
        travelers: {
          old: oldTotal,
          new: newTotal,
          difference: seatDifference,
        },
        seats:
          seatDifference !== 0
            ? {
                adjusted: Math.abs(seatDifference),
                action: seatDifference > 0 ? 'added' : 'removed',
                availableNow: departure.availableSeats,
              }
            : null,
        pricing: pricingChanged
          ? {
              oldTotal: oldTotalAmount,
              newTotal: newTotalAmount,
              difference: newTotalAmount - oldTotalAmount,
              pendingAmount: booking.pricing.pendingAmount,
            }
          : null,
        leadTraveler: booking.leadTraveler,
      },
    };

    res.json({
      success: true,
      statusCode: 200,
      message: pricingChanged
        ? 'Traveler information updated successfully. Pricing has been recalculated.'
        : 'Traveler information updated successfully',
      data: responseData,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.params; // This is the MongoDB _id

    // Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Restore seats if booking is not already cancelled
    if (booking.bookingStatus !== 'Cancelled') {
      const tourPackage = await TourPackageCard.findById(booking.tourPackage);

      if (tourPackage) {
        const departure = tourPackage.departures.find(
          (dep) =>
            dep._id?.toString() ===
            booking.selectedDeparture.departureId.toString(),
        );

        if (departure) {
          // Restore seats
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
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking deleted successfully',
      data: {
        deletedBookingId: bookingId,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const query: any = {};

    if (status) {
      query.bookingStatus = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const bookings = await Booking.find(query)
      .populate({
        path: 'tourPackage',
        select: '_id title badge tourType days category',
        populate: [
          {
            path: 'category',
            select: 'image',
          },
        ],
      })
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      statusCode: 200,
      message: 'All bookings retrieved successfully',
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

// Create Razorpay Payment Order
export const createPaymentOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;
    const { amount } = req.body;

    // Find user
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    // Find booking
    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    });

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Validate booking status
    if (booking.bookingStatus === 'Cancelled') {
      return next(
        new appError('Cannot process payment for cancelled booking', 400),
      );
    }

    if (booking.paymentStatus === 'Fully Paid') {
      return next(new appError('Booking is already fully paid', 400));
    }

    // Validate amount
    if (!amount || amount <= 0) {
      return next(new appError('Invalid payment amount', 400));
    }

    if (amount > booking.pricing.pendingAmount) {
      return next(
        new appError(
          `Payment amount ₹${amount} exceeds pending amount ₹${booking.pricing.pendingAmount}`,
          400,
        ),
      );
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(amount, booking.bookingId);

    // Send response
    res.json({
      success: true,
      statusCode: 200,
      message: 'Payment order created successfully',
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        bookingId: booking.bookingId,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, amount } =
      req.body;

    // Find user
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    // Find booking
    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    });

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    );

    if (!isValid) {
      return next(
        new appError('Payment verification failed. Invalid signature.', 400),
      );
    }

    // Payment verified! Save it
    const paymentData = {
      paymentId: razorpayPaymentId,
      amount: amount / 100, // Convert paise to rupees
      paymentMethod: 'UPI' as const, // or get from frontend
      paymentStatus: 'Success' as const,
      paymentDate: new Date(),
      transactionId: razorpayPaymentId,
      razorpayOrderId: razorpayOrderId,
      razorpayPaymentId: razorpayPaymentId,
      razorpaySignature: razorpaySignature,
      remarks: 'Online payment via Razorpay',
    };

    // Add payment
    booking.payments.push(paymentData);

    // Update payment status
    booking.updatePaymentStatus();

    await booking.save();

    // Get updated booking
    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('tourPackage', 'title subtitle days nights');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Payment verified and recorded successfully',
      data: {
        booking: updatedBooking,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
        remainingAmount: booking.pricing.pendingAmount,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Handle Payment Failure
export const handlePaymentFailure = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUid } = req.user!;
    const { bookingId } = req.params;
    const { razorpayOrderId, error } = req.body;

    // Find user
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return next(new appError('User not found', 404));
    }

    // Find booking
    const booking = await Booking.findOne({
      bookingId,
      user: user._id,
    });

    if (!booking) {
      return next(new appError('Booking not found', 404));
    }

    // Log failed payment
    const failedPayment = {
      paymentId: `FAILED_${Date.now()}`,
      amount: 0,
      paymentMethod: 'UPI' as const,
      paymentStatus: 'Failed' as const,
      paymentDate: new Date(),
      razorpayOrderId: razorpayOrderId,
      remarks: `Payment failed: ${error?.description || 'Unknown error'}`,
    };

    booking.payments.push(failedPayment);
    await booking.save();

    res.json({
      success: false,
      statusCode: 400,
      message: 'Payment failed',
      data: {
        bookingId: booking.bookingId,
        error: error?.description || 'Payment was not successful',
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};
