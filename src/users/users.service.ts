import { Injectable } from '@nestjs/common';
import prisma from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.services';

@Injectable()
export class UsersService {
  constructor(private authService: AuthService) {}

  async createUser(data) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        birthdate: data.birthdate,
        biography: data.biography,
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async updateUser(id: string, data) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      const token = await this.authService.generateToken(user.id);
      return { token };
    }

    return null;
  }
}
