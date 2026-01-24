// models/tabcards.model.ts
import mongoose, { Schema } from 'mongoose';
import { ITabCards, ITabCard } from './tabcardsInterface';

const tabCardSchema = new Schema<ITabCard>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    tours: {
      type: Number,
      required: [true, 'Tours count is required'],
      min: [0, 'Tours count cannot be negative'],
    },
    departures: {
      type: Number,
      required: [true, 'Departures count is required'],
      min: [0, 'Departures count cannot be negative'],
    },
    guests: {
      type: String,
      required: [true, 'Guests count is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
      maxlength: [50, 'Badge text cannot exceed 50 characters'],
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true,
      default: '/tour-list',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['world', 'india'],
      lowercase: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true },
);

const tabCardsSchema = new Schema<ITabCards>(
  {
    cards: {
      type: [tabCardSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for faster queries
tabCardsSchema.index({ 'cards.category': 1 });
tabCardsSchema.index({ 'cards.order': 1 });
tabCardsSchema.index({ 'cards.isActive': 1 });

export const TabCards = mongoose.model<ITabCards>('TabCards', tabCardsSchema);
