import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneByEmail(email);
  }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const saltOrRounds = 10;

    const newUser = new User({ ...createUserDto });

    newUser.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    await this.userRepository.create(newUser);
  }
}
