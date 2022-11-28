import { Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { zip } from 'compressing'; // 可以将文件进行压缩成zip
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 单文件上传，多文件用 FilesInterceptor
  upload() {
    return '成功上传😊';
  }

  @Get('download')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1669638365685.png'); // 文件地址拼接
    res.download(url);
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1669638365685.png'); // 文件地址拼接
    const targetStreamZip = new zip.Stream();
    await targetStreamZip.addEntry(url);
    // 返回流请求头为 stream —— 固定写法
    res.setHeader('Content-Type', 'application/octet-stream');
    targetStreamZip.pipe(res);
  }
}
