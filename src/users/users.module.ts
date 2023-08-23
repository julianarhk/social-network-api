import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Chave secreta para assinar o token
      signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
