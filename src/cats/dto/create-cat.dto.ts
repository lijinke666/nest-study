/**
 * 定义 Cat 这个模型 的数据结构
 */

export class CreateCatDto {
  // readonly 表示 只读 不可被更改
  readonly name: string;
  readonly age: number;
  readonly type: string;
}