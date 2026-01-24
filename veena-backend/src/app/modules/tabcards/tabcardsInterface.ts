// types/tabcards.types.ts
import { Document, Types } from 'mongoose';

export interface ITabCard {
  _id?: Types.ObjectId;
  title: string;
  tours: number;
  departures: number;
  guests: string;
  image: string;
  badge?: string;
  link: string;
  category: 'world' | 'india';

  isActive: boolean;
}

export interface ITabCards extends Document {
  cards: ITabCard[];
  createdAt: Date;
  updatedAt: Date;
}
