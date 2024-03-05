import { UUID } from 'crypto';

export interface GetSupportRequestsWithDetailsDto {
  id: UUID;
  number_needed: number;
  current_number_of_volunteers: number;
  skills_required: string;
  description: string;
  shift: {
    id: UUID;
    start_time: string;
    end_time: string;
    date: Date;
    department: string;
  };
}
