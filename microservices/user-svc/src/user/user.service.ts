import { Injectable, HttpStatus, Logger, Inject } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.interface";
import { ResponseHandlerService } from "src/helper/response-handler.service";
import { JwtService } from "@nestjs/jwt";
import { ClientGrpc, Client } from "@nestjs/microservices";
import * as grpc from "grpc";
import {
  CreateUserDto,
  GetUserByEmailDto,
  UserCreatedResponse,
  UserResponse,
} from "./dto/user.dto";

const GrpcStatus = grpc.status;

@Injectable()
export class UserService {
  private sentryService: any;
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private readonly responseHandlerService: ResponseHandlerService
  ) {}

  async create(input: CreateUserDto): Promise<UserCreatedResponse> {
    try {
      const user = await this.userModel.create(input);

      return {
        ...user,
        message: "User created successfully",
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null
      );
    }
  }

  async getUserByEmail(input: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await this.userModel.findOne({ email: input.email });
      if (user) return { _id: user.id };
      else return this.create(input);
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null
      );
    }
  }

  async getUserById(input: UserResponse): Promise<UserCreatedResponse> {
    try {
      return this.userModel.findOne({ _id: input._id });
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null
      );
    }
  }
}
