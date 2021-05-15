import { Schema, model } from 'mongoose';

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
  createdAt: Date;
}

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model<User>('User', UserSchema);

export { UserModel };
