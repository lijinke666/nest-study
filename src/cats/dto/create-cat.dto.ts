/**
 * 定义 Cat 这个模型 的数据结构
 */
import {IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateCatDto {
  @ApiModelProperty({
    description: '姓名',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({
    description: '年龄',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @ApiModelProperty({
    description: '种类, 1 公猫, 2 母猫',
  })
  @IsEnum(['1', '2'])
  readonly type: string;
}