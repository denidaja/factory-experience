import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateShiftRequestDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}
