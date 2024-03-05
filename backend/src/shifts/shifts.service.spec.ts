import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftsService } from './shifts.service';
import { Shift } from './entities/shifts.entity';
import { CreateShiftRequestDto } from './dtos/create-shift-request.dto';

describe('ShiftsService', () => {
  let service: ShiftsService;
  let repository: Repository<Shift>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShiftsService,
        {
          provide: getRepositoryToken(Shift),
          useFactory: () => ({
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<ShiftsService>(ShiftsService);
    repository = module.get<Repository<Shift>>(getRepositoryToken(Shift));
  });

  describe('getShifts', () => {
    it('should return an array of shifts', async () => {
      // Given
      const testShifts: Shift[] = [];
      jest.spyOn(repository, 'find').mockResolvedValue(testShifts);

      // When
      const result = await service.getShifts();

      // Then
      expect(result).toBe(testShifts);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getShiftById', () => {
    it('should return a single shift', async () => {
      // Given
      const testShift = new Shift();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(testShift);
      const shiftId = '134143e0-f221-46e6-bfb0-fd53f131b54a';

      // When
      const result = await service.getShiftById(shiftId);

      // Then
      expect(result).toBe(testShift);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: shiftId });
    });
  });

  describe('create', () => {
    it('should successfully save a shift', async () => {
      // Given
      const createShiftDto: CreateShiftRequestDto = {
        date: new Date(),
        start_time: '09:00',
        end_time: '17:00',
        department: 'Manufacturing',
      };
      const savedShift = new Shift();
      jest.spyOn(repository, 'save').mockResolvedValue(savedShift);

      // When
      const result = await service.create(createShiftDto);

      // Then
      expect(result).toBe(savedShift);
      expect(repository.save).toHaveBeenCalledWith(createShiftDto);
    });
  });

  describe('delete', () => {
    it('should delete a shift', async () => {
      // Given
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: {} });
      const shiftId = '134143e0-f221-46e6-bfb0-fd53f131b54a';

      // When
      const result = await service.delete(shiftId);

      // Then
      expect(result).toEqual({ affected: 1, raw: {} });
      expect(repository.delete).toHaveBeenCalledWith(shiftId);
    });
  });
});
