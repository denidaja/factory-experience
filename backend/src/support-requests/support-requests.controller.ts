import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupportRequestsService } from './support-requests.service';
import { CreateSupportRequestDto } from './dtos/create-support-request.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../users/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Support Requests')
@Controller('support-requests')
export class SupportRequestsController {
  constructor(private supportRequestsService: SupportRequestsService) {}

  @Get()
  async getSupportRequests(@Query('includeDetails') includeDetails: string) {
    const includeDetailsFlag = includeDetails === 'true';

    return await this.supportRequestsService.getSupportRequests(
      includeDetailsFlag,
    );
  }

  @Roles(Role.LINE_MANAGER)
  @UseGuards(RolesGuard)
  @Post()
  async createSupportRequest(@Body() supportRequest: CreateSupportRequestDto) {
    return await this.supportRequestsService.create(supportRequest);
  }
}
