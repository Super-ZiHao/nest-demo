import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string {
    this.catsService.gets();
    return '123';
  }

  @Post()
  create(@Body() body: CreateCatDto): any {
    return body;
  }
}
