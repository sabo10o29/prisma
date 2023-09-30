import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, books } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // .env sample
    const configService = new ConfigService();
    const databaseUrl = configService.get<string>('DATABASE_URL');
    const host = configService.get<string>('DB_HOST');
    console.log('@', databaseUrl, host);
    // prisma client sample
    const prisma = new PrismaClient();
    const book: books = await prisma.books.create({
      data: {
        name: 'test name',
        title: 'test title',
      },
    });
    const allBooks = await prisma.books.findMany();
    const outputBook = allBooks[0];
    console.log('@', book, allBooks, outputBook);
    return this.appService.getHello();
  }
}
