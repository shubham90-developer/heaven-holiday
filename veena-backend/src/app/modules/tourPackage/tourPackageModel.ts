import mongoose, { Schema } from 'mongoose';
import { ITourPackage, ITourPackageCard } from './tourPackageInterface';

const TourPackageCardSchema = new Schema<ITourPackageCard>(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    tours: {
      type: Number,
      required: true,
      min: 0,
    },
    departures: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      trim: true,
      default: undefined,
    },
    link: {
      type: String,
      required: true,
      default: '/tour-details',
    },
    cities: {
      type: [String],
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    startOn: {
      type: Date,
      required: true,
    },
    joinPrice: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true },
);

const TourPackageSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    packages: {
      type: [TourPackageCardSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        (ret as any).createdAt = new Date(
          (ret as any).createdAt,
        ).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
        });
        (ret as any).updatedAt = new Date(
          (ret as any).updatedAt,
        ).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
        });
        return ret;
      },
    },
  },
);

// Create index for searching package cities
TourPackageSchema.index({ 'packages.city': 'text' });

export const TourPackage = mongoose.model<ITourPackage>(
  'TourPackage',
  TourPackageSchema,
);
