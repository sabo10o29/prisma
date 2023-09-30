import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const configService = new ConfigService();
    const databaseUrl = configService.get<string>('DATABASE_URL');
    console.log('@@@@@@', databaseUrl);
    return this.appService.getHello();
  }
}
