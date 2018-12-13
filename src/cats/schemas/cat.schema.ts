import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  type: String,
});