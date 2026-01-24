import { Document } from 'mongoose';

export interface IComment extends Document {
  name: string;
  comment: string;
}
