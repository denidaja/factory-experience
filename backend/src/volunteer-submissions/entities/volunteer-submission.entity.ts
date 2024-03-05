import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from 'crypto';
import { User } from '../../users/entities/users.entity';
import { SupportRequest } from '../../support-requests/entities/support-request.entity';

@Entity({ name: 'volunteer_submissions' })
@Unique(['user', 'support_request'])
export class VolunteerSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SupportRequest)
  @JoinColumn({ name: 'support_request_id' })
  support_request: SupportRequest;

  @Column()
  sign_up_time: Date;

  @Column({ default: false })
  attendance_confirmed: boolean;

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
