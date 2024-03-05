import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { CreateVolunteerSubmissionDto } from './dtos/create-volunteer-submission.dto';
import { VolunteerSubmission } from './entities/volunteer-submission.entity';
import { SupportRequest } from '../support-requests/entities/support-request.entity';
import { User } from '../users/entities/users.entity';

@Injectable()
export class VolunteerSubmissionsService {
  private readonly logger = new Logger(VolunteerSubmissionsService.name);

  constructor(
    @InjectRepository(VolunteerSubmission)
    private volunteerSubmissionRepository: Repository<VolunteerSubmission>,
    private dataSource: DataSource,
  ) {}

  async getVolunteerSubmissions(includeDetails: boolean = false) {
    return this.volunteerSubmissionRepository.find({
      relations: {
        support_request: includeDetails,
        user: includeDetails,
      },
    });
  }

  async createVolunteerSubmission(
    user: User,
    submission: CreateVolunteerSubmissionDto,
  ) {
    return await this.dataSource.transaction(async (manager) => {
      const supportRequest = await manager
        .getRepository(SupportRequest)
        .findOne({
          where: { id: submission.support_request_id },
          lock: { mode: 'pessimistic_write' },
        });

      if (!supportRequest) {
        this.logger.debug(supportRequest);
        throw new PreconditionFailedException('Support need not found');
      }

      const submissionCount = await manager
        .getRepository(VolunteerSubmission)
        .createQueryBuilder('volunteerSubmission')
        .where('volunteerSubmission.support_request_id = :id', {
          id: supportRequest.id,
        })
        .getCount();

      if (submissionCount >= supportRequest.number_needed) {
        throw new BadRequestException('This support need is fully booked');
      }

      const volunteerSubmission = manager
        .getRepository(VolunteerSubmission)
        .create({
          user: user,
          support_request: supportRequest,
          sign_up_time: new Date(),
        });

      try {
        return await manager
          .getRepository(VolunteerSubmission)
          .save(volunteerSubmission);
      } catch (error) {
        throw new BadRequestException(
          'Failed to create volunteer submission, you have already registered once.',
        );
      }
    });
  }

  async confirmAttendance(volunteerSubmissionId: UUID) {
    const volunteerSubmission =
      await this.volunteerSubmissionRepository.findOneBy({
        id: volunteerSubmissionId,
      });

    if (!volunteerSubmission) {
      throw new NotFoundException('Volunteer submission not found');
    }

    volunteerSubmission.attendance_confirmed = true;
    return this.volunteerSubmissionRepository.save(volunteerSubmission);
  }
}
