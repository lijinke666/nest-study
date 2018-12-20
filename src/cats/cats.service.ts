import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { Log4jsService } from 'nest-log4js';

// controller 对应 要一个 service
@Injectable()
export class CatsService {
  constructor(
    @Inject('CatModelToken')
    private readonly catModel: Model<Cat>,       // 注入 Cat 模型

    private readonly logger: Log4jsService,
  ){}

  async create(createCatDto: CreateCatDto) {
    return await this.catModel.create(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    this.logger.log('cats-findAll:', 'test message');
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catModel.findById(id).exec();
  }
}
