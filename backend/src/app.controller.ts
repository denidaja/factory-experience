import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { User } from './auth/decorators/user.decorator';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('healthcheck')
  async getHealthcheck(): Promise<string> {
    return 'Good and healthy!';
  }
  @Get('whoami')
  async getUser(@User() user): Promise<string> {
    return await this.appService.getUser(user.id);
  }
}
