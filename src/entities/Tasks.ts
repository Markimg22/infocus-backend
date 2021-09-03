import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Users } from './User';

@Entity('tasks')
class Tasks {
  @PrimaryColumn()
  readonly id: string;

  @Column('varchar')
  title: string;

  @Column('boolean')
  is_completed!: boolean;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => Users)
  user: Users;

  @Column('varchar')
  user_id: string;

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

export { Tasks };
