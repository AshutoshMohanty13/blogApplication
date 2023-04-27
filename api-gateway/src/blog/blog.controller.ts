import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from 'src/auth/decorator/getUser';
import { ResponseHandlerService } from 'src/helper/response-handler.service';
import { BlogService } from './blog.service';
import { CreateBlogRequest, UpdateBlogRequest } from './dto/blog.request';
import { BlogResponse, MessageResponse } from './dto/blog.response';

@Controller('blog')
export class BlogController {
  constructor(
    private blogService: BlogService,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  @ApiTags('Blog')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Blog creted successfully',
    type: MessageResponse,
  })
  @ApiInternalServerErrorResponse({
    description: `Blog creation failed`,
  })
  @ApiBadRequestResponse({ description: `Enter required details` })
  @Post('/createBlog')
  @UseGuards(AuthGuard('jwt'))
  async createBlog(
    @Body() createBlogRequest: CreateBlogRequest,
    @Users() user,
  ): Promise<MessageResponse> {
    try {
      createBlogRequest.userId = user._id.toString();
      createBlogRequest.userName = user.first_name;
      console.log(createBlogRequest);

      return await this.blogService.createBlog(createBlogRequest);
    } catch (e) {
      e.details = JSON.parse(e.details);
      await this.responseHandlerService.response(
        e.details,
        e.details.statusCode,
        null,
      );
    }
  }

  @ApiTags('Blog')
  @ApiOkResponse({
    description: 'Blogs fetched successfully',
    type: [BlogResponse],
  })
  @ApiInternalServerErrorResponse({
    description: `Blog fetching failed`,
  })
  @Get('/getAllBlogs')
  async getAllBlogs(): Promise<BlogResponse[]> {
    try {
      return await this.blogService.getAllBlogs({});
    } catch (e) {
      e.details = JSON.parse(e.details);
      await this.responseHandlerService.response(
        e.details,
        e.details.statusCode,
        null,
      );
    }
  }

  @ApiTags('Blog')
  @ApiOkResponse({
    description: 'Blog fetched successfully',
    type: BlogResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to fetch blog',
  })
  @Get('/getBlogById/:id')
  async getBlogById(@Param('id') id: string): Promise<BlogResponse> {
    try {
      return await this.blogService.getBlogById({ id });
    } catch (e) {
      e.details = JSON.parse(e.details);
      await this.responseHandlerService.response(
        e.details,
        e.details.statusCode,
        null,
      );
    }
  }

  @ApiTags('Blog')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Blog fetched successfully',
    type: [BlogResponse],
  })
  @ApiInternalServerErrorResponse({
    description: `Blog fetching failed`,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/getBlogByUser')
  async getBlogByUser(@Users() user): Promise<BlogResponse[]> {
    try {
      return this.blogService.getBlogByUser({
        userId: user._id.toString(),
      });
    } catch (e) {
      e.details = JSON.parse(e.details);
      await this.responseHandlerService.response(
        e.details,
        e.details.statusCode,
        null,
      );
    }
  }

  @ApiTags('Blog')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Blog Updated successfully',
    type: MessageResponse,
  })
  @ApiInternalServerErrorResponse({
    description: `Blog fetching failed`,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/updateBlog')
  async updateBlog(
    @Body() updateBlogRequest: UpdateBlogRequest,
    @Users() user,
  ): Promise<MessageResponse> {
    try {
      const inputObject = {
        _id: updateBlogRequest._id,
        title: updateBlogRequest?.title,
        body: updateBlogRequest?.body,
        userId: user._id.toString(),
      };

      return this.blogService.updateBlog(inputObject);
    } catch (e) {
      e.details = JSON.parse(e.details);
      await this.responseHandlerService.response(
        e.details,
        e.details.statusCode,
        null,
      );
    }
  }

  @ApiTags('Blog')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Blog Deleted successfully',
    type: MessageResponse,
  })
  @ApiInternalServerErrorResponse({
    description: `Blog deletion failed`,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/deleteBlog/:id')
  async deleteBlog(
    @Param('id') id: string,
    @Users() user,
  ): Promise<MessageResponse> {
    try {
      return this.blogService.deleteBlog({
        _id: id,
        userId: user._id.toString(),
      });
    } catch (e) {
      e.details = JSON.parse(e.details);
      await this.responseHandlerService.response(
        e.details,
        e.details.statusCode,
        null,
      );
    }
  }
}
