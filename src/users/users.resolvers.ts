import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../graphql.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-cat.dto';
import { UsersGuard } from './users.guard';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  // @UseGuards(UsersGuard)
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query('user')
  async findOneById(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  // mutation CreateReviewForEpisode($user: CreateUserInput) {
  //   createUser(createUserInput: $user) {
  //     nickname
  //     phone
  //   }
  // }

  //   "user": {
  //     "nickname": "赵日天",
  //     "phone": "1233333"
  //   }
  // }
  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDto): Promise<User> {
    const createdUser = this.usersService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    };
  }
}
