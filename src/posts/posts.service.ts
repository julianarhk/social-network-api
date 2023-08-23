import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data) {
    const post = await this.prisma.post.create({
      data: {
        content: data.content,
        user: { connect: { id: data.userId } },
        password: data.password,
      },
    });
    return post;
  }

  async getAllPosts() {
    const posts = await this.prisma.post.findMany({
      include: { user: true },
    });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    return post;
  }

  async updatePost(id: number, data) {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data,
    });
    return updatedPost;
  }

  async deletePost(id: number) {
    const deletedPost = await this.prisma.post.delete({
      where: { id },
    });
    return deletedPost;
  }
}
