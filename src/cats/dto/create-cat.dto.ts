/**
 * 定义 Cat 这个模型 的数据结构
 */
import {IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
export class CreateCatDto {
  // readonly 表示 只读 不可被更改
  readonly id: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsEnum(['1', '2'])
  readonly type: string;
}