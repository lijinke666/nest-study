import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

// controller 对应 要一个 service
@Injectable()
export class CatsService {
  constructor(
    @Inject('CatModelToken')
    private readonly catModel: Model<Cat>,       // 注入 Cat 模型
  ){}

  async create(createCatDto: CreateCatDto) {
    return await this.catModel.create(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catModel.findById(id).exec();
  }
}
