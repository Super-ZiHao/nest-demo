import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  gets() {
    return [123];
  }

  tes() {
    return 321;
  }
}
