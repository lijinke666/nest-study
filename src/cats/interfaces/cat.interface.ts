import { Document } from 'mongoose';
export interface Cat extends Document {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly type: string;
}