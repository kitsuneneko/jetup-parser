import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
