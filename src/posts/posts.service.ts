import { Injectable } from '@nestjs/common';
import prisma from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  async createPost(data) {
    const newPost = await prisma.post.create({
      data: {
        content: data.content,
        user: { connect: { id: data.userId } },
      },
    });
    return newPost;
  }

  async getAllPosts() {
    const posts = await prisma.post.findMany({
      include: { user: true },
    });
    return posts;
  }

  async getPostById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
    return post;
  }

  async updatePost(id: string, data) {
    const updatedPost = await prisma.post.update({
      where: { id },
      data,
    });
    return updatedPost;
  }

  async deletePost(id: string) {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return deletedPost;
  }
}
