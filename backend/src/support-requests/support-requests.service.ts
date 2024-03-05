import {
  BadRequestException,
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportRequest } from './entities/support-request.entity';
import { Shift } from '../shifts/entities/shifts.entity';
import { VolunteerSubmission } from '../volunteer-submissions/entities/volunteer-submission.entity';
import { CreateSupportRequestDto } from './dtos/create-support-request.dto';

@Injectable()
export class SupportRequestsService {
  private readonly logger = new Logger(SupportRequestsService.name);

  constructor(
    @InjectRepository(SupportRequest)
    private supportRequestRepository: Repository<SupportRequest>,
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
    @InjectRepository(VolunteerSubmission)
    private volunteerSubmissionRepository: Repository<VolunteerSubmission>,
  ) {}

  async getSupportRequests(includeDetails: boolean = false) {
    if (!includeDetails) {
      return await this.supportRequestRepository.find();
    }

    const supportRequests = await this.supportRequestRepository.find({
      relations: {
        shift: true,
      },
    });

    return await Promise.all(
      supportRequests.map(async (supportRequest) => {
        const count = await this.volunteerSubmissionRepository
          .createQueryBuilder('volunteerSubmission')
          .where('volunteerSubmission.support_request_id = :id', {
            id: supportRequest.id,
          })
          .getCount();

        return {
          ...supportRequest,
          current_number_of_volunteers: count,
        };
      }),
    );
  }
  async create(supportRequest: CreateSupportRequestDto) {
    const shift = await this.shiftRepository.findOneBy({
      id: supportRequest.shift_id,
    });

    if (!shift) {
      throw new PreconditionFailedException('Shift not found');
    }

    const newSupportRequest = this.supportRequestRepository.create({
      ...supportRequest,
      shift,
    });

    try {
      return await this.supportRequestRepository.save(newSupportRequest);
    } catch (error) {
      throw new BadRequestException(
        `Shift with ID ${supportRequest.shift_id} already has a support request created.`,
      );
    }
  }
}
