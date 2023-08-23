import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.services';
import { hashPassword, comparePasswords } from '../auth/auth.utils'; // Corrija o import da função hashPassword

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createUser(data) {
    const hashedPassword = await hashPassword(data.password); // Use a função hashPassword corretamente
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        birthdate: data.birthdate,
        biography: data.biography,
        password: hashedPassword,
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return user;
  }

  async updateUser(id: string, data) {
    const updatedUser = await this.prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return deletedUser;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (user) {
      const isPasswordValid = comparePasswords(password, user.password);
      if (isPasswordValid) {
        const token = await this.authService.generateToken(user.id);
        return { token };
      }
    }

    return null;
  }
}
