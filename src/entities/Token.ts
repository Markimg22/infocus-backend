import {
  Column, CreateDateColumn, Entity, UpdateDateColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './User';

@Entity('tokens')
class Token {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  hash: string;

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

export { Token };
