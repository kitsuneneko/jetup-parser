import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  
  @Get()
  async getAll(@Query('page') page, @Query('limit') limit, @Query('search') search): Promise<[User[], number]> {
    return await this.userService.getAll(search, page, limit);
  }

}
