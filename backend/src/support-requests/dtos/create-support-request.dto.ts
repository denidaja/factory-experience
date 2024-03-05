import { UUID } from 'crypto';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSupportRequestDto {
  @IsNumber()
  @IsNotEmpty()
  number_needed: number;

  @IsUUID()
  @IsNotEmpty()
  shift_id: UUID;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  skills_required: string;
}
