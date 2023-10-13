import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email })
    if (!user) throw new UnauthorizedException()
    if (user.password !== password) throw new UnauthorizedException()

    const payload = { id: user.id, email: user.email, isActive: user.isActive, type: user.type }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
