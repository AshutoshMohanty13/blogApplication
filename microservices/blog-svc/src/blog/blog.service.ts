import { Injectable, HttpStatus, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './interfaces/blog.interface';
import { ResponseHandlerService } from '../helper/response-handler.service';
import * as grpc from 'grpc';
import {
  CreateBlogDto,
  GetAllBlogsResponse,
  GetAllBlogsResponseArray,
  GetBlogByIdDto,
  GetBlogByUserDto,
  MessageResponse,
  UpdateBlogDto,
  DeleteBlogDto,
} from './dto/blog.dto';

const GrpcStatus = grpc.status;

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<Blog>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async createBlog(input: CreateBlogDto): Promise<MessageResponse> {
    try {
      await this.blogModel.create(input);
      return {
        message: 'Blog created successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null,
      );
    }
  }

  async getAllBlogs(): Promise<GetAllBlogsResponseArray> {
    try {
      const blogs = await this.blogModel.find({ deletedAt: null });
      return { getAllBlogsResponse: blogs };
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null,
      );
    }
  }

  async getBlogById(input: GetBlogByIdDto): Promise<GetAllBlogsResponse> {
    try {
      return this.blogModel.findById(input.id);
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null,
      );
    }
  }

  async getBlogByUser(
    input: GetBlogByUserDto,
  ): Promise<GetAllBlogsResponseArray> {
    try {
      const blogs = await this.blogModel.find({
        userId: input.userId,
        deletedAt: null,
      });
      return { getAllBlogsResponse: blogs };
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null,
      );
    }
  }

  async updateBlog(input: UpdateBlogDto): Promise<MessageResponse> {
    try {
      const post = await this.blogModel.findOne({
        _id: input._id,
        userId: input.userId,
        deletedAt: null,
      });
      if (!post) throw new Error('Please send correct blog ID');
      if (input.title) post.title = input.title;
      if (input.body) post.body = input.body;
      await post.save();
      return {
        message: 'Blog updated successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null,
      );
    }
  }

  async deleteBlog(input: DeleteBlogDto): Promise<MessageResponse> {
    try {
      const post = await this.blogModel.findOne({
        _id: input._id,
        userId: input.userId,
      });
      if (!post) throw new Error('Please send correct blog ID');
      post.deletedAt = new Date();
      post.save();

      return {
        message: 'Blog deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (e) {
      await this.responseHandlerService.response(
        e,
        HttpStatus.NOT_ACCEPTABLE,
        GrpcStatus.UNAUTHENTICATED,
        null,
      );
    }
  }
}
