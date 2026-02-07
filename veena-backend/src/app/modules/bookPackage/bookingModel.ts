// models/bookingModel.ts

import mongoose, { Schema } from 'mongoose';
import {
  IBooking,
  ITraveler,
  ISelectedDeparture,
  ITravelerCount,
  ILeadTraveler,
  IPricing,
  IPayment,
} from './bookingInterface';

// ========== SUB-SCHEMAS ==========

const TravelerSchema = new Schema<ITraveler>(
  {
    type: {
      type: String,
      enum: ['Adult', 'Child', 'Infant'],
      required: true,
    },
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Ms', 'Master', 'Miss'],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    isLeadTraveler: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

const SelectedDepartureSchema = new Schema<ISelectedDeparture>(
  {
    departureId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    departureCity: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    packageType: {
      type: String,
      enum: ['Full Package', 'Joining Package'],
      required: true,
    },
  },
  { _id: false },
);

const TravelerCountSchema = new Schema<ITravelerCount>(
  {
    adults: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
    },
    infants: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const LeadTravelerSchema = new Schema<ILeadTraveler>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const PricingSchema = new Schema<IPricing>(
  {
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    advanceAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    pricePerPerson: {
      type: Number,
      min: 0,
    },
  },
  { _id: false },
);

// In bookingModel.ts

const PaymentSchema = new Schema<IPayment>(
  {
    paymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'UPI', 'Net Banking', 'Wallet'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Pending',
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },

    razorpayOrderId: {
      type: String,
      trim: true,
    },
    razorpayPaymentId: {
      type: String,
      trim: true,
    },
    razorpaySignature: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

// In bookingModel.ts - ADD THIS

const RefundSchema = new Schema(
  {
    refundId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
      default: 'Pending',
    },
    paymentId: String,
    razorpayRefundId: String,
    reason: String,
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    processedAt: Date,
    remarks: String,
  },
  { _id: true },
);

// ========== MAIN BOOKING SCHEMA ==========

const BookingSchema = new Schema<IBooking>(
  {
    // Identification
    bookingId: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
    },

    // References
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tourPackage: {
      type: Schema.Types.ObjectId,
      ref: 'TourPackageCard',
      required: true,
      index: true,
    },

    // Departure
    selectedDeparture: {
      type: SelectedDepartureSchema,
      required: true,
    },

    // Travelers
    travelers: {
      type: [TravelerSchema],
      required: true,
      validate: {
        validator: function (travelers: ITraveler[]) {
          return travelers.length > 0;
        },
        message: 'At least one traveler is required',
      },
    },

    travelerCount: {
      type: TravelerCountSchema,
      required: true,
    },

    leadTraveler: {
      type: LeadTravelerSchema,
    },

    // Pricing
    pricing: {
      type: PricingSchema,
      required: true,
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Advance Paid', 'Fully Paid'],
      default: 'Pending',
      index: true,
    },

    payments: {
      type: [PaymentSchema],
      default: [],
    },
    refunds: {
      type: [RefundSchema],
      default: [],
    },

    // Status
    bookingStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
      index: true,
    },

    // Dates
    bookingDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    balancePaymentDueDate: Date,
  },
  {
    timestamps: true,
  },
);

// ========== INDEXES ==========
BookingSchema.index({ bookingId: 1 }, { unique: true });
BookingSchema.index({ user: 1, bookingStatus: 1 });
BookingSchema.index({ tourPackage: 1, 'selectedDeparture.departureDate': 1 });
BookingSchema.index({ bookingStatus: 1, paymentStatus: 1 });
BookingSchema.index({ createdAt: -1 });

// ========== PRE-SAVE MIDDLEWARE ==========
BookingSchema.pre('save', function (next) {
  // Auto-calculate total travelers
  this.travelerCount.total =
    this.travelerCount.adults +
    this.travelerCount.children +
    this.travelerCount.infants;

  // Validate travelers array matches count
  const actualCounts = {
    adults: this.travelers.filter((t) => t.type === 'Adult').length,
    children: this.travelers.filter((t) => t.type === 'Child').length,
    infants: this.travelers.filter((t) => t.type === 'Infant').length,
  };

  if (
    actualCounts.adults !== this.travelerCount.adults ||
    actualCounts.children !== this.travelerCount.children ||
    actualCounts.infants !== this.travelerCount.infants
  ) {
    return next(new Error('Traveler count mismatch with travelers array'));
  }

  // Extract lead traveler info
  const leadTraveler = this.travelers.find((t) => t.isLeadTraveler);
  if (leadTraveler) {
    this.leadTraveler = {
      name: `${leadTraveler.firstName} ${leadTraveler.lastName}`,
      email: leadTraveler.email,
      phone: leadTraveler.phone,
    };
  }

  // // Calculate pending amount
  // this.pricing.pendingAmount =
  //   this.pricing.totalAmount - (this.pricing.paidAmount || 0);
  // Calculate pending amount (ensure it's never negative)
  this.pricing.pendingAmount = Math.max(
    0,
    this.pricing.totalAmount - (this.pricing.paidAmount || 0),
  );

  next();
});

// ========== METHODS ==========
BookingSchema.methods.calculateTotalPaid = function (): number {
  return this.payments
    .filter((p: IPayment) => p.paymentStatus === 'Success')
    .reduce((sum: number, p: IPayment) => sum + p.amount, 0);
};

BookingSchema.methods.updatePaymentStatus = function (): void {
  const totalPaid = this.calculateTotalPaid();
  this.pricing.paidAmount = totalPaid;

  const minimumRequired = this.pricing.totalAmount * 0.5; // 50% minimum

  if (totalPaid === 0) {
    this.paymentStatus = 'Pending';
    this.bookingStatus = 'Pending';
  } else if (totalPaid >= this.pricing.totalAmount) {
    this.paymentStatus = 'Fully Paid';
    this.bookingStatus = 'Confirmed';
  } else if (totalPaid >= minimumRequired) {
    this.paymentStatus = 'Advance Paid';
    this.bookingStatus = 'Confirmed';
  } else {
    // Less than 50% paid
    this.paymentStatus = 'Pending';
    this.bookingStatus = 'Pending';
  }
};

// ========== EXPORT ==========
export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
