import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFService } from './app.service';
import { Request, Response } from 'express'; // Import Request and Response types

@Controller('pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadPDF(@UploadedFile() pdf: any, @Req() req: Request, @Res() res: Response): Promise<any> {
    const uploadedPDF = this.pdfService.createPDF(pdf.originalname, pdf.buffer);

    // Construct the PDF path
    const pdfPath = `/files/${uploadedPDF.filename}`; // Adjust the path as per your server setup

    return res.send({ message: 'PDF uploaded successfully', pdf: { ...uploadedPDF, path: pdfPath } });
  }

  @Get()
  async getPdfs(@Req() req: Request, @Res() res: Response): Promise<any> { // Specify Request and Response types
    const pdfs = this.pdfService.getPDFs();
    return res.send({ pdfs });
  }
}
