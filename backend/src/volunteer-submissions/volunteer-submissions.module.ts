import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerSubmissionsController } from './volunteer-submissions.controller';
import { VolunteerSubmissionsService } from './volunteer-submissions.service';
import { VolunteerSubmission } from './entities/volunteer-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerSubmission])],
  controllers: [VolunteerSubmissionsController],
  providers: [VolunteerSubmissionsService],
})
export class VolunteerSubmissionsModule {}
