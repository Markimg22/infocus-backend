import { Schema, model } from 'mongoose';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt?: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  tasks: Task[];
  createdAt?: Date;
}

const TaskSchema = new Schema<Task>({
  title: String,
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: { type: [TaskSchema], default: undefined },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = model<User>('User', UserSchema);

export { UserModel };
