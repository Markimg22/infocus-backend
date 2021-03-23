import { Schema } from 'mongoose';

export interface TasksInterface {
  title: string;
  isCompleted: boolean;
}

export const TasksSchema = new Schema({
  title: String,
  isCompleted: Boolean,
}, {
  timestamps: true,
});
