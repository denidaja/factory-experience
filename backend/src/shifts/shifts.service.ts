import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Shift } from './entities/shifts.entity';
import { CreateShiftRequestDto } from './dtos/create-shift-request.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftsRepository: Repository<Shift>,
  ) {}

  async getShifts() {
    return this.shiftsRepository.find();
  }

  async getShiftById(id: UUID) {
    return this.shiftsRepository.findOneBy({ id });
  }

  async create(createShiftRequest: CreateShiftRequestDto) {
    return this.shiftsRepository.save(createShiftRequest);
  }

  async delete(id: UUID) {
    return this.shiftsRepository.delete(id);
  }
}
