import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class Users {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
