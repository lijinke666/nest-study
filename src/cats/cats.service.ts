import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// controller 对应 要一个 service
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private id: number = 0;

  create(cat: Cat){
    // TODO: 替换成 数据库的 create()
    const _id = this.id ++;
    this.cats.push({
      ...cat,
      id: _id,
    });
    return true;
  }

  findAll(): Cat[] {
    // TODO: 替换成 数据库 的 find()
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
