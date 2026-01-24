import { Document, Types } from 'mongoose';

export interface ITourPackageCard {
  _id?: Types.ObjectId;
  city: string;
  tours: number;
  departures: number;
  price: string;
  image: string;
  badge?: string | null;
  status: 'Active' | 'Inactive';
  order: number;
  link: string;
  cities: string[];
  days: number;
  startOn: Date;
  joinPrice: string;
}

export interface ITourPackage extends Document {
  title: string;
  subtitle: string;
  packages: ITourPackageCard[];
  createdAt: Date;
  updatedAt: Date;
}
