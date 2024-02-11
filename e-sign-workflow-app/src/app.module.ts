import { Module } from '@nestjs/common';
import { PDFController } from './app.controller';
import { PDFService } from './app.service';

@Module({
  imports: [],
  controllers: [PDFController],
  providers: [PDFService],
})
export class AppModule {}
