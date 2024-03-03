import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  check(): { status: number; data: string } {
    return { status: 200, data: 'OK' };
  }
}
