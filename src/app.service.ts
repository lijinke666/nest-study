import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(config: ConfigService){
    console.log('\n@AppService-Config: ============================= \n');
    console.log(config);
    console.log('\n@AppService-Config: ============================= \n');
  }
  root(): string {
    return '李金珂的 nest.js 学习';
  }
}
