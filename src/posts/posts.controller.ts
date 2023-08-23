// posts.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Body() data) {
    const newPost = await this.postsService.createPost(data);
    return newPost;
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    return posts;
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const post = await this.postsService.getPostById(id);
    return post;
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() data) {
    const updatedPost = await this.postsService.updatePost(id, data);
    return updatedPost;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    const deletedPost = await this.postsService.deletePost(id);
    return deletedPost;
  }
}
