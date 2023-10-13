import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
