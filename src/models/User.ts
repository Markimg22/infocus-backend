import { Schema, model, Document } from 'mongoose';

import { TasksInterface, TasksSchema } from './Tasks';
import { PerformanceInterface, PerformanceSchema } from './Performance';

interface UserInterface extends Document {
  email: string;
  userName: string;
  password: string;
  tasks?: TasksInterface[];
  performance?: PerformanceInterface;
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [TasksSchema],
  performance: PerformanceSchema,
}, {
  timestamps: true,
});

export default model<UserInterface>('User', UserSchema);

// class User {
//   constructor(body) {
//     this.body = body;
//     this.errors = [];
//     this.user = null;
//   }

//   private login() {
//   }

//   // public async userExists(req: Request, res: Response): Promise<boolean> {
//   //   const { email, userName } = req.body;
//   //   const user = await User.findOne({ email }) || await User.findOne({ userName });

//   //   return !user;
//   // }
// }

// export default User;
