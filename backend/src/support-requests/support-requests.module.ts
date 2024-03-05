import { Module } from '@nestjs/common';
import { SupportRequestsController } from './support-requests.controller';
import { SupportRequestsService } from './support-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from './entities/support-request.entity';
import { Shift } from '../shifts/entities/shifts.entity';
import { VolunteerSubmission } from '../volunteer-submissions/entities/volunteer-submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportRequest, Shift, VolunteerSubmission]),
  ],
  controllers: [SupportRequestsController],
  providers: [SupportRequestsService],
})
export class SupportRequestsModule {}
