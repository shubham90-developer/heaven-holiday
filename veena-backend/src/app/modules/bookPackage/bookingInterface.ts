// models/bookingInterface.ts

import { Document, Types } from 'mongoose';

// ========== TRAVELER INTERFACE ==========
export interface ITraveler {
  _id?: Types.ObjectId;
  type: 'Adult' | 'Child' | 'Infant';
  title: 'Mr' | 'Mrs' | 'Ms' | 'Master' | 'Miss';
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age: number;
  gender: 'Male' | 'Female';
  isLeadTraveler?: boolean;
  email?: string;
  phone?: string;
}

// ========== SELECTED DEPARTURE INTERFACE ==========
export interface ISelectedDeparture {
  departureId: Types.ObjectId;
  departureCity: string;
  departureDate: Date;
  packageType: 'Full Package' | 'Joining Package';
}

// ========== TRAVELER COUNT INTERFACE ==========
export interface ITravelerCount {
  adults: number;
  children: number;
  infants: number;
  total: number;
}

// ========== LEAD TRAVELER INTERFACE ==========
export interface ILeadTraveler {
  name: string;
  email?: string;
  phone?: string;
}

// ========== PRICING INTERFACE ==========
export interface IPricing {
  totalAmount: number;
  advanceAmount: number;
  paidAmount: number;
  pendingAmount: number;
  pricePerPerson?: number;
}

// ========== PAYMENT INTERFACE ==========
export interface IPayment {
  _id?: Types.ObjectId;
  paymentId: string;
  amount: number;
  paymentMethod: 'Cash' | 'Card' | 'UPI' | 'Net Banking' | 'Wallet';
  paymentStatus: 'Pending' | 'Success' | 'Failed';
  paymentDate: Date;
  transactionId?: string;
  remarks?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}

// ========== MAIN BOOKING INTERFACE ==========
export interface IBooking extends Document {
  // Identification
  bookingId: string;

  // References
  user: Types.ObjectId;
  tourPackage: Types.ObjectId;

  // Departure
  selectedDeparture: ISelectedDeparture;

  // Travelers
  travelers: ITraveler[];
  travelerCount: ITravelerCount;
  leadTraveler: ILeadTraveler;

  // Pricing
  pricing: IPricing;

  // Payment
  paymentStatus: 'Pending' | 'Advance Paid' | 'Fully Paid';
  payments: IPayment[];

  // Status
  bookingStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

  // Dates
  bookingDate?: Date;
  balancePaymentDueDate?: Date;

  // Timestamps (from mongoose)
  createdAt?: Date;
  updatedAt?: Date;

  // Methods
  calculateTotalPaid(): number;
  updatePaymentStatus(): void;
}
