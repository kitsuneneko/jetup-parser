import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(userData: CreateUserDto): Promise<User> {
    return await this.userRepository.save(userData);
  }

  async getAll(search = '', page = 1, limit = 10): Promise<[User[], number]> {
    const skip = (page - 1) * limit;
    return await this.userRepository.findAndCount({ where: { userName: Like('%' + search + '%') }, take: limit, skip });
  }

}
