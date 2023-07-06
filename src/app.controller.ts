import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/filterAuthDecorator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get("/hello")
  async hello() {
    return this.appService.getHello();
  }
  
}
