import { UUID } from 'crypto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateVolunteerSubmissionDto {
  @IsUUID()
  @IsNotEmpty()
  support_request_id: UUID;
}
