import {
  Column, JoinColumn, OneToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Entity,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Users } from './User';

@Entity('performance')
export class Performance {
  @PrimaryColumn()
  readonly id: string;

  @Column({ default: 0 })
  total_tasks_completed: number;

  @Column({ default: 0 })
  total_time_work: number;

  @Column({ default: 0 })
  total_time_rest: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => Users)
  user: Users;

  @Column()
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
