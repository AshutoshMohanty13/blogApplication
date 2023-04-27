import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { BlogServiceInterface } from 'src/_proto/interfaces/blog.interface';
import { BlogServiceClientOptions } from './blog-svc.options';
import {
  CreateBlogRequest,
  DeleteBlogRequest,
  GetBlogByIdRequest,
  GetBlogByUserRequest,
  UpdateBlogRequest,
} from './dto/blog.request';

@Injectable()
export class BlogService {
  @Client(BlogServiceClientOptions)
  private readonly blogServiceClient: ClientGrpc;
  private readonly logger = new Logger(BlogService.name);

  private blogService: any;

  async onModuleInit() {
    this.blogService =
      this.blogServiceClient.getService<BlogServiceInterface>('BlogService');
  }

  async createBlog(createBlogRequest: CreateBlogRequest) {
    return this.blogService.createBlog(createBlogRequest).toPromise();
  }

  async getAllBlogs({}) {
    return this.blogService.getAllBlogs({}).toPromise();
  }

  async getBlogById(getBlogByIdRequest: GetBlogByIdRequest) {
    return this.blogService.getBlogById(getBlogByIdRequest).toPromise();
  }

  async getBlogByUser(getBlogByUserRequest: GetBlogByUserRequest) {
    return this.blogService.getBlogByUser(getBlogByUserRequest).toPromise();
  }

  async updateBlog(updateBlogRequest: UpdateBlogRequest) {
    return this.blogService.updateBlog(updateBlogRequest).toPromise();
  }

  async deleteBlog(deleteBlogRequest: DeleteBlogRequest) {
    return this.blogService.deleteBlog(deleteBlogRequest).toPromise();
  }
}
