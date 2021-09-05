import {
  Column, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './User';

@Entity('refresh_token')
class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  expires_in: number;

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

export { RefreshToken };
