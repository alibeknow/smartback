import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('blockchain')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/mint')
  createCrypto(): Promise<any> {
    return this.appService.createToken();
  }

  @Post('/sendTransaction')
  sendTransaction(): Promise<any> {
    return this.appService.transferToken();
  }

  @Post('/approve')
  approve(): Promise<any> {
    return this.appService.approveToken();
  }
  @Get('/getInfo')
  getTokenInfo(): Promise<any> {
    return this.appService.getTokenInfo();
  }

  @Delete('/burn')
  burnAmount(): Promise<any> {
    return this.appService.burnToken();
  }
}
