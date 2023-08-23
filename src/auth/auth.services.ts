import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }
}
