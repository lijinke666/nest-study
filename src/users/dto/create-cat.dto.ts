/**
 * 定义 Cat 这个模型 的数据结构
 */
import { IsNotEmpty, Min, Max } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

  readonly id: string;
  @ApiModelProperty({
    description: '昵称',
  })
  @IsNotEmpty()
  readonly nickname: string;

  @ApiModelProperty({
    description: '手机号',
  })
  @IsNotEmpty()
  @Min(11)
  @Max(11)
  readonly phone: string;
}
