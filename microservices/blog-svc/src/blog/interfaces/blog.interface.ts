import { Document } from 'mongoose';
export interface Blog extends Document {
  title: string;
  body: string;
  userId: string;
  userName: string;
  deletedAt: Date;
}
