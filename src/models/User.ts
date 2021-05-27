import { Schema, model } from 'mongoose';

export interface Performance {
  _id: string;
  totalTasksCompleted: number;
  totalWorkingTime: number;
  totalRestTime: number;
}

export interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  tasks: Task[];
  performance: Performance;
  createdAt: Date;
}

const PerformanceSchema = new Schema<Performance>({
  totalTasksCompleted: {
    type: Number,
    require: true,
    default: 0,
  },
  totalWorkingTime: {
    type: Number,
    require: true,
    default: 0,
  },
  totalRestTime: {
    type: Number,
    require: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskSchema = new Schema<Task>({
  title: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new Schema<User>({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  tasks: [TaskSchema],
  performance: {
    type: PerformanceSchema,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model<User>('User', UserSchema);

export { UserModel };
