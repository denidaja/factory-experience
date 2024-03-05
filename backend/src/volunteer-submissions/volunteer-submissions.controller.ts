import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { VolunteerSubmissionsService } from './volunteer-submissions.service';
import { CreateVolunteerSubmissionDto } from './dtos/create-volunteer-submission.dto';
import { User } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../users/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Volunteer Submissions')
@Controller('volunteer-submissions')
export class VolunteerSubmissionsController {
  constructor(
    private volunteerSubmissionsService: VolunteerSubmissionsService,
  ) {}

  @Get()
  @Roles(Role.LINE_MANAGER)
  @UseGuards(RolesGuard)
  async getVolunteerSubmissions(
    @Query('includeDetails') includeDetails: string,
  ) {
    const includeDetailsFlag = includeDetails === 'true';

    return this.volunteerSubmissionsService.getVolunteerSubmissions(
      includeDetailsFlag,
    );
  }

  @Post()
  async createVolunteerSubmission(
    @User() user,
    @Body() submission: CreateVolunteerSubmissionDto,
  ) {
    return this.volunteerSubmissionsService.createVolunteerSubmission(
      user,
      submission,
    );
  }

  @Roles(Role.LINE_MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id/confirm-attendance')
  async confirmAttendance(@Param('id') volunteerSubmissionId: UUID) {
    return this.volunteerSubmissionsService.confirmAttendance(
      volunteerSubmissionId,
    );
  }
}
