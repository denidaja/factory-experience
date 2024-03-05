import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftRequestDto } from './dtos/create-shift-request.dto';
import { UUID } from 'crypto';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@Roles(Role.LINE_MANAGER)
@UseGuards(RolesGuard)
@ApiTags('Shifts')
@Controller('shifts')
export class ShiftsController {
  constructor(private shiftsService: ShiftsService) {}

  @Get()
  async getShifts() {
    return await this.shiftsService.getShifts();
  }

  @Get(':id')
  async getShiftById(@Param('id') id: UUID) {
    return await this.shiftsService.getShiftById(id);
  }

  @Post()
  async createShift(@Body() createShiftRequest: CreateShiftRequestDto) {
    return await this.shiftsService.create(createShiftRequest);
  }
  @Delete(':id')
  async deleteShiftById(@Param('id') id: UUID) {
    return await this.shiftsService.delete(id);
  }
}
