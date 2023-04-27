/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from "mongoose";
import { User } from "../user.interface";
import { ResponseHandlerService } from "src/helper/response-handler.service";
import * as grpc from "grpc";
const GrpcStatus = grpc.status;
const responseHandlerService = new ResponseHandlerService();

export const UserSchema = new mongoose.Schema<User>(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
