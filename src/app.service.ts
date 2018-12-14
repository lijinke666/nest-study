import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(config: ConfigService){
    console.log(config);
  }
  root(): string {
    return 'Hello World!';
  }
}
