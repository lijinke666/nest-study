import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema';

@Injectable()
export class UsersService {
  private readonly users: User[] = [{
    id: '1',
    nickname: '李金珂',
    phone: '1818111111',
  }];

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: string) {
    console.log('@@@', id);
    return this.users.find(user => user.id === id);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
