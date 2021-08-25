import {
  Column, JoinColumn, OneToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Entity,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Users } from './User';

@Entity('refresh_token')
class RefreshToken {
  @PrimaryColumn()
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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RefreshToken };
