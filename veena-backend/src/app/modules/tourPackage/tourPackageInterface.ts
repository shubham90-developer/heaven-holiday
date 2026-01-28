import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

// ============= SUB-DOCUMENT INTERFACES =============
export interface IFlight {
  fromCity: string;
  toCity: string;
  departureDate: Date;
  departureTime: string;
  arrivalDate: Date;
  arrivalTime: string;
  airline: string;
  duration?: string;
}
export interface IAccommodation {
  city: string;
  country: string;
  hotelName: string;
  checkInDate?: Date;
  checkOutDate?: Date;
}
export interface IReportingDropping {
  guest_type: string;
  reporting_Point: string;
  dropping_Point: string;
}
export interface IState {
  name: string;
  cities: string[];
}

export interface ICityDetails {
  name: string;
  nights: number;
}

export interface IItinerary {
  day: number;
  date?: Date;
  title: string;
  activity: string;
}
// ============= NEW: DEPARTURE INTERFACE =============
export interface IDeparture {
  city: string;
  date: Date;
  fullPackagePrice: number;
  joiningPrice: number;
  availableSeats: number;
  totalSeats: number;
  status: 'Available' | 'Filling Fast' | 'Sold Out' | 'Cancelled';
}

// ============= MAIN DOCUMENT INTERFACES =============

export interface ICategory extends Document {
  name: string;
  title: string;
  description?: string;
  guests: string;
  image: string;
  badge?: string;
  categoryType: 'world' | 'india';
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface ITourPackageCard extends Document {
  title: string;
  subtitle: string;
  category: mongoose.Types.ObjectId;
  galleryImages: string[];
  badge?: string;
  metaDescription?: string;
  featured: boolean;
  status: 'Active' | 'Inactive';
  tourType: string;
  days: number;
  nights: number;
  states: IState[];
  route: string;
  cityDetails: ICityDetails[];

  // UPDATED: Base prices for display only
  baseFullPackagePrice: number;
  baseJoiningPrice: number;
  priceNote?: string;

  // NEW: Departures array
  departures: IDeparture[];

  tourManagerIncluded: boolean;
  tourManagerNote?: string;
  whyTravel: string[];
  tourIncludes: Types.ObjectId[];
  itinerary?: IItinerary[];
  flights: IFlight[];
  accommodations: IAccommodation[];
  reportingDropping: IReportingDropping[];
  createdAt: Date;
  updatedAt: Date;
}
