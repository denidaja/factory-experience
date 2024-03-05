import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { Shift } from './entities/shifts.entity';

describe('ShiftsController', () => {
  let controller: ShiftsController;
  let service: ShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftsController],
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

    controller = module.get<ShiftsController>(ShiftsController);
    service = module.get<ShiftsService>(ShiftsService);
  });

  describe('getShifts', () => {
    it('should return an array of shifts', async () => {
      // Given
      const result: Shift[] = [];
      jest.spyOn(service, 'getShifts').mockResolvedValue(result);

      // When
      const shifts = await controller.getShifts();

      // Then
      expect(shifts).toBe(result);
      expect(service.getShifts).toHaveBeenCalled();
    });
  });

  describe('getShiftById', () => {
    it('should return a single shift', async () => {
      // Given
      const result: Shift = new Shift();
      jest.spyOn(service, 'getShiftById').mockResolvedValue(result);
      const shiftId = '134143e0-f221-46e6-bfb0-fd53f131b54a';

      // When
      const shift = await controller.getShiftById(shiftId);

      // Then
      expect(shift).toBe(result);
      expect(service.getShiftById).toHaveBeenCalledWith(shiftId);
    });
  });
});
