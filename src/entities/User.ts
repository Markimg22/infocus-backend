import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

import { Task } from './Task';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // eslint-disable-next-line no-unused-vars
  @OneToMany((type) => Task, (user) => User)
  tasks: Task[];

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
