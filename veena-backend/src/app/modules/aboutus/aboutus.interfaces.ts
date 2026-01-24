import { Document } from 'mongoose';

export interface IAboutus extends Document {
  aboutus: {
    title: string;
    description: string;
    video: string;
  };
  createdAt: Date;
  updatedAt: Date;
}