import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { User } from '../graphql.schema';

@Injectable()
export class UsersService {
  private readonly users: User[] = [{
    id: '11',
    nickname: '李金珂',
    phone: '1818111111',
  }];

  findAll(): Users[] {
    return this.users;
  }

  findOneById(id: string) {
    return this.users.find(user => user.id === id);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
