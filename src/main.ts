import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import cheerio from 'cheerio';
import axios from 'axios';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(
    AppModule,
  );

  const userService = application.get(UserService);
  axios.get('https://jetup.digital/team').then(res => {
    const $ = cheerio.load(res.data);
    $(".text-block-item").each((i, el) => { 
        const userName = $(el).find('.user-name').text();
        const position = $(el).find('.position').text();
        const userText = $(el).find('.user-text').text();
        const userData: User = { userName, position, userText }
        userService.create(userData)

    });
  }).catch(err => console.error(err));

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
