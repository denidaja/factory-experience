import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerSubmissionsService } from './volunteer-submissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { VolunteerSubmission } from './entities/volunteer-submission.entity';
import { CreateVolunteerSubmissionDto } from './dtos/create-volunteer-submission.dto';
import { SupportRequest } from '../support-requests/entities/support-request.entity';
import { User } from '../users/entities/users.entity';

const mockVolunteerSubmissionRepository = () => ({
  findOneBy: jest.fn(),
  save: jest.fn(),
});

const mockDataSource = {
  transaction: jest.fn(),
};

describe('VolunteerSubmissionsService', () => {
  let service: VolunteerSubmissionsService;
  let mockManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerSubmissionsService,
        {
          provide: getRepositoryToken(VolunteerSubmission),
          useValue: mockVolunteerSubmissionRepository(),
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<VolunteerSubmissionsService>(
      VolunteerSubmissionsService,
    );

    mockManager = {
      getRepository: jest.fn().mockImplementation((entity) => {
        if (entity === SupportRequest) {
          return {
            findOne: jest.fn().mockResolvedValue({ number_needed: 1 }),
          };
        } else if (entity === VolunteerSubmission) {
          return {
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockResolvedValue({}),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockResolvedValue(0),
            })),
          };
        }
      }),
    };

    mockDataSource.transaction.mockImplementation(async (cb) =>
      cb(mockManager),
    );
  });

  describe('createVolunteerSubmission', () => {
    it('should successfully create a volunteer submission if conditions are met', async () => {
      // Given
      const user: User = new User();
      const createVolunteerSubmissionDto: CreateVolunteerSubmissionDto = {
        support_request_id: '134143e0-f221-46e6-bfb0-fd53f131b54a',
      };
      const supportRequest: SupportRequest = {
        number_needed: 1,
      } as SupportRequest;
      const volunteerSubmission: VolunteerSubmission =
        new VolunteerSubmission();

      mockDataSource.transaction.mockImplementation(async (cb) =>
        cb({
          getRepository: jest.fn().mockImplementation((entity) => {
            if (entity === SupportRequest) {
              return { findOne: jest.fn().mockResolvedValue(supportRequest) };
            }
            if (entity === VolunteerSubmission) {
              return {
                create: jest.fn().mockReturnValue(volunteerSubmission),
                save: jest.fn().mockResolvedValue(volunteerSubmission),
                createQueryBuilder: jest.fn(() => ({
                  where: jest.fn().mockReturnThis(),
                  getCount: jest.fn().mockResolvedValue(0),
                })),
              };
            }
          }),
        }),
      );

      // When
      const result = await service.createVolunteerSubmission(
        user,
        createVolunteerSubmissionDto,
      );

      // Then
      expect(result).toBe(volunteerSubmission);
      expect(mockDataSource.transaction).toHaveBeenCalled();
    });
  });
});
