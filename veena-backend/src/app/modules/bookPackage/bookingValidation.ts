import { z } from 'zod';

// ========== TRAVELER VALIDATION ==========
const travelerSchema = z.object({
  type: z.enum(['Adult', 'Child', 'Infant'], {
    message: 'Traveler type must be Adult, Child, or Infant',
  }),

  title: z.enum(['Mr', 'Mrs', 'Ms', 'Master', 'Miss'], {
    message: 'Invalid title',
  }),

  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' })
    .trim(),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name cannot exceed 50 characters' })
    .trim(),

  dateOfBirth: z.coerce.date().refine((date) => date < new Date(), {
    message: 'Date of birth must be in the past',
  }),

  age: z.coerce
    .number()
    .int({ message: 'Age must be a whole number' })
    .min(0, { message: 'Age cannot be negative' })
    .max(120, { message: 'Age cannot exceed 120' }),

  gender: z.enum(['Male', 'Female'], {
    message: 'Gender must be Male or Female',
  }),

  isLeadTraveler: z.boolean().optional(),

  email: z
    .union([z.string().email('Invalid email format'), z.literal('')])
    .optional(),

  phone: z
    .union([
      z
        .string()
        .regex(
          /^[6-9]\d{9}$/,
          'Phone number must be a valid 10-digit Indian number',
        ),
      z.literal(''),
    ])
    .optional(),
});

// ========== SELECTED DEPARTURE ==========
const selectedDepartureSchema = z.object({
  departureId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid departure ID format'),

  departureCity: z
    .string()
    .min(2, { message: 'Departure city must be at least 2 characters' })
    .trim(),

  departureDate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    { message: 'Departure date must be today or in the future' },
  ),

  packageType: z.enum(['Full Package', 'Joining Package'], {
    message: 'Package type must be Full Package or Joining Package',
  }),
});

// ========== TRAVELER COUNT ==========
const travelerCountSchema = z.object({
  adults: z.coerce
    .number()
    .int({ message: 'Adults count must be a whole number' })
    .min(1, { message: 'At least 1 adult is required' }),

  children: z.coerce
    .number()
    .int({ message: 'Children count must be a whole number' })
    .min(0, { message: 'Children count cannot be negative' })
    .default(0),

  infants: z.coerce
    .number()
    .int({ message: 'Infants count must be a whole number' })
    .min(0, { message: 'Infants count cannot be negative' })
    .default(0),

  total: z.coerce
    .number()
    .int({ message: 'Total count must be a whole number' })
    .min(1, { message: 'Total travelers must be at least 1' }),
});

// ========== PRICING ==========
const pricingSchema = z.object({
  totalAmount: z.coerce
    .number()
    .min(0, { message: 'Total amount cannot be negative' })
    .finite({ message: 'Total amount must be a valid number' }),

  advanceAmount: z.coerce
    .number()
    .min(0, { message: 'Advance amount cannot be negative' })
    .finite({ message: 'Advance amount must be a valid number' }),

  paidAmount: z.coerce
    .number()
    .min(0, { message: 'Paid amount cannot be negative' })
    .default(0)
    .optional(),

  pendingAmount: z.coerce
    .number()
    .min(0, { message: 'Pending amount cannot be negative' })
    .default(0)
    .optional(),

  pricePerPerson: z.coerce
    .number()
    .min(0, { message: 'Price per person cannot be negative' })
    .optional(),
});

// ========== PAYMENT ==========
const paymentSchema = z.object({
  paymentId: z
    .string()
    .min(5, { message: 'Payment ID must be at least 5 characters' }),

  amount: z.coerce
    .number()
    .min(1, { message: 'Payment amount must be greater than 0' })
    .finite({ message: 'Payment amount must be a valid number' }),

  paymentMethod: z.enum(['Cash', 'Card', 'UPI', 'Net Banking', 'Wallet'], {
    message: 'Invalid payment method',
  }),

  paymentStatus: z.enum(['Pending', 'Success', 'Failed']).default('Pending'),

  paymentDate: z.coerce.date().default(() => new Date()),

  transactionId: z.string().optional(),

  remarks: z
    .string()
    .max(500, { message: 'Remarks cannot exceed 500 characters' })
    .optional(),
});

// ========== CREATE BOOKING ==========
export const createBookingSchema = z
  .object({
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
    tourPackage: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid tour package ID format'),
    selectedDeparture: selectedDepartureSchema,
    travelers: z
      .array(travelerSchema)
      .min(1, { message: 'At least one traveler is required' })
      .max(20, { message: 'Cannot book for more than 20 travelers' }),
    travelerCount: travelerCountSchema,
    pricing: pricingSchema,
  })

  .refine(
    (data) => {
      const adults = data.travelers.filter((t) => t.type === 'Adult').length;
      const children = data.travelers.filter((t) => t.type === 'Child').length;
      const infants = data.travelers.filter((t) => t.type === 'Infant').length;
      return (
        adults === data.travelerCount.adults &&
        children === data.travelerCount.children &&
        infants === data.travelerCount.infants
      );
    },
    {
      message: 'Traveler count does not match travelers array',
      path: ['travelers'],
    },
  )

  .refine(
    (data) => {
      const sum =
        data.travelerCount.adults +
        data.travelerCount.children +
        data.travelerCount.infants;
      return data.travelerCount.total === sum;
    },
    {
      message: 'Total must equal adults + children + infants',
      path: ['travelerCount', 'total'],
    },
  )

  .refine((data) => data.travelers.some((t) => t.isLeadTraveler), {
    message: 'At least one lead traveler required',
    path: ['travelers'],
  })

  .refine(
    (data) => data.travelers.filter((t) => t.isLeadTraveler).length === 1,
    {
      message: 'Only one lead traveler allowed',
      path: ['travelers'],
    },
  )

  .refine(
    (data) => {
      const lead = data.travelers.find((t) => t.isLeadTraveler);
      return lead && (lead.email || lead.phone);
    },
    { message: 'Lead traveler must have email or phone', path: ['travelers'] },
  )

  .refine((data) => data.pricing.advanceAmount <= data.pricing.totalAmount, {
    message: 'Advance amount cannot exceed total amount',
    path: ['pricing', 'advanceAmount'],
  })

  .refine(
    (data) =>
      data.travelers.every(
        (t) =>
          (t.type === 'Adult' && t.age >= 12) ||
          (t.type === 'Child' && t.age >= 2 && t.age < 12) ||
          (t.type === 'Infant' && t.age < 2),
      ),
    { message: 'Traveler age does not match type', path: ['travelers'] },
  );

// ========== OTHER SCHEMAS ==========
export const updateBookingStatusSchema = z.object({
  bookingStatus: z.enum(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
});

export const addPaymentSchema = paymentSchema;

export const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum(['Pending', 'Advance Paid', 'Fully Paid']),
});

export const getBookingsQuerySchema = z.object({
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  tourPackage: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  bookingStatus: z
    .enum(['Pending', 'Confirmed', 'Completed', 'Cancelled'])
    .optional(),
  paymentStatus: z.enum(['Pending', 'Advance Paid', 'Fully Paid']).optional(),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const cancelBookingSchema = z.object({
  reason: z.string().min(10).max(500).optional(),
});

// ========== TYPES ==========
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<
  typeof updateBookingStatusSchema
>;
export type AddPaymentInput = z.infer<typeof addPaymentSchema>;
export type UpdatePaymentStatusInput = z.infer<
  typeof updatePaymentStatusSchema
>;
export type GetBookingsQueryInput = z.infer<typeof getBookingsQuerySchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
