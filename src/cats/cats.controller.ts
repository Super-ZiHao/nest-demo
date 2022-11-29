import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('code')
  createCode(@Req() req, @Res() res): any {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });

    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('dto')
  createUser(@Body() body: CreateCatDto): any {
    console.log(body);
    return [1, 2, 3, 4, 5];
  }
}
