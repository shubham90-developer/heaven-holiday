import mongoose from 'mongoose';
import { IOffice } from './contactOffice.interface';

// const officeSchema = new mongoose.Schema<IOffice>(
//   {
//     city: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     status: {
//       type: String,
//       enum: ['active', 'inactive'],
//       default: 'active',
//     },
//     forex: {
//       type: Boolean,
//       default: false,
//     },
//     address: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true },
// );

// export const Office = mongoose.model<IOffice>('Office', officeSchema);

const officeSchema = new mongoose.Schema<IOffice>(
  {
    city: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    forex: { type: Boolean, default: false },

    address: { type: String, required: true, trim: true },

    phone: { type: String, required: true, trim: true },

    mapUrl: {
      type: String,
      trim: true,
      default: '',
    },

    officeState: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },

    timings: [
      {
        day: String,
        open: String,
        close: String,
        closed: Boolean,
      },
    ],
  },
  { timestamps: true },
);

export const Office = mongoose.model<IOffice>('Office', officeSchema);

