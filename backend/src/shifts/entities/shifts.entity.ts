import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from 'crypto';
import { SupportRequest } from '../../support-requests/entities/support-request.entity';

@Entity({ name: 'shift' })
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  date: Date;

  @Column('time')
  start_time: string;

  @Column('time')
  end_time: string;

  @Column()
  department: string;

  @OneToMany(() => SupportRequest, (supportRequest) => supportRequest.shift)
  support_request: SupportRequest;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
