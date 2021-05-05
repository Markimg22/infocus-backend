import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';

@Entity('tasks')
class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  is_completed: boolean;

  // eslint-disable-next-line no-unused-vars
  @ManyToOne((type) => User, (tasks) => Task)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Task };
