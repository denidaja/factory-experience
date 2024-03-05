import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from 'crypto';
import { Shift } from '../../shifts/entities/shifts.entity';

@Entity({ name: 'support_request' })
export class SupportRequest {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  description: string;

  @Column()
  number_needed: number;

  @Column()
  skills_required: string;

  @ManyToOne(() => Shift, (shift) => shift.support_request, {
    nullable: false,
  })
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

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
