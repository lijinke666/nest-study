import { Controller, Get, Req, HttpCode, Post, Body, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

// 控制器("命名空间 ")
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,   // 将 service 当做构造参数传入
  ){}

  // 返回一个 Promise : 泛型 表示返回值是一个 Promise 对象
  // @Get 装饰器 = express.Router().get('/cats')
  @Get()
  async findAll(): Promise<any[]>{
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.catsService.findOne(id);
  }

  // 同理
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCatDto: CreateCatDto){
    this.catsService.create(createCatDto);
  }
}