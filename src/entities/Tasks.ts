import {
  Column, CreateDateColumn, Entity, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './User';

@Entity('tasks')
class Tasks {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column()
  is_completed!: boolean;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => Users)
  user: Users;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Tasks };
