import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<void> {
    const insertResult = await this.userRepository.insert(user);
    console.log(insertResult)
  }

  async update(
    id: string,
    updateUserDto: Partial<User>,
  ): Promise<User | undefined> {
    const user = await this.findOne(id);
    if (!user) {
      return undefined;
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}