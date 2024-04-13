import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    if ((await this.findOne(createUserDto.email)) !== undefined) {
      throw new BadRequestException('User already exists');
    }
    const saltOrRounds = 10;

    const newUser = new User({ ...createUserDto });

    newUser.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    newUser.isActive = true;
    await this.userRepository.save(newUser);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if ((await this.findOne(createUserDto.email)) !== undefined) {
      throw new BadRequestException('User already exists');
    }
    const saltOrRounds = 10;

    const newUser = new User({ ...createUserDto });

    newUser.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    newUser.isActive = true;
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOneById(id);

    const saltOrRounds = 10;

    existingUser.firstName = updateUserDto.firstName;
    existingUser.lastName = updateUserDto.lastName;
    existingUser.password = await bcrypt.hash(
      updateUserDto.password,
      saltOrRounds,
    );

    return await this.userRepository.save(existingUser);
  }

  async remove(id: string): Promise<User> {
    const existingUser = await this.findOneById(id);

    await this.userRepository.softDelete(existingUser);

    return existingUser;
  }
}
