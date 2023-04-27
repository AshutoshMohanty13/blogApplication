/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';
import { Blog } from '../interfaces/blog.interface';

export const BlogSchema = new mongoose.Schema<Blog>(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
