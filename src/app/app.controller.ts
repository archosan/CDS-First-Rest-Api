import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/')
  check(): { status: number; data: string } {
    return this.appService.check();
  }
}
