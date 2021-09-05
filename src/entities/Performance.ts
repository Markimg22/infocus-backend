import {
  Column, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './User';

@Entity('performance')
class Performance {
  @PrimaryGeneratedColumn('uuid')
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
}

export { Performance };
