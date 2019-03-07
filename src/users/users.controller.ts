import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,   // 将 service 当做构造参数传入
  ) { }

  @Get()
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }
}
