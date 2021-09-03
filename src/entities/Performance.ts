import {
  Column, JoinColumn, OneToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Entity,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Users } from './User';

@Entity('performance')
class Performance {
  @PrimaryColumn()
  readonly id: string;

  @Column('numeric', { default: 0 })
  total_tasks_completed: number;

  @Column('numeric', { default: 0 })
  total_time_work: number;

  @Column('numeric', { default: 0 })
  total_time_rest: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => Users)
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

export { Performance };
