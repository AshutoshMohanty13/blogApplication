import { Controller, Inject, Logger, HttpStatus } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { UserService } from "./user.service";

import * as grpc from "grpc";
const GrpcStatus = grpc.status;

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod("UserService", "create")
  async create(input) {
    return this.userService.create(input);
  }

  @GrpcMethod("UserService", "getUserByEmail")
  async getUserByEmail(input) {
    return this.userService.getUserByEmail(input);
  }
  @GrpcMethod("UserService", "getUserById")
  async getUserById(input) {
    return this.userService.getUserById(input);
  }
}
