import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolvers';

@Module({
  providers: [UsersService, UsersResolvers],
})

export class UsersModule {}
