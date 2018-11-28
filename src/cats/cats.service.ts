import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// controller 对应 要一个 service
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat){
    // TODO: 替换成 数据库的 create()
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    // TODO: 替换成 数据库 的 find()
    return this.cats;
  }
}
