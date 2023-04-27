import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BlogService } from './blog.service';

import * as grpc from 'grpc';
import {
  CreateBlogDto,
  DeleteBlogDto,
  GetAllBlogsResponse,
  GetAllBlogsResponseArray,
  GetBlogByIdDto,
  GetBlogByUserDto,
  MessageResponse,
  UpdateBlogDto,
} from './dto/blog.dto';
const GrpcStatus = grpc.status;

@Controller()
export class BlogController {
  constructor(private blogService: BlogService) {}

  @GrpcMethod('BlogService', 'createBlog')
  async createBlog(input: CreateBlogDto): Promise<MessageResponse> {
    return this.blogService.createBlog(input);
  }

  @GrpcMethod('BlogService', 'getAllBlogs')
  async getAllBlogs(): Promise<GetAllBlogsResponseArray> {
    return this.blogService.getAllBlogs();
  }

  @GrpcMethod('BlogService', 'getBlogById')
  async getBlogById(input: GetBlogByIdDto): Promise<GetAllBlogsResponse> {
    return this.blogService.getBlogById(input);
  }

  @GrpcMethod('BlogService', 'getBlogByUser')
  async getBlogByUser(
    input: GetBlogByUserDto,
  ): Promise<GetAllBlogsResponseArray> {
    return this.blogService.getBlogByUser(input);
  }

  @GrpcMethod('BlogService', 'updateBlog')
  async updateBlog(input: UpdateBlogDto): Promise<MessageResponse> {
    return this.blogService.updateBlog(input);
  }

  @GrpcMethod('BlogService', 'deleteBlog')
  async deleteBlog(input: DeleteBlogDto): Promise<MessageResponse> {
    return this.blogService.deleteBlog(input);
  }
}
