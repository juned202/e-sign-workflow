import { Injectable } from '@nestjs/common';
import { PDF } from './pdf.model';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class PDFService {
  [x: string]: any;
  private readonly pdfs: PDF[] = [];
  private readonly pdfDirectory = path.join(__dirname, '..', 'files');


  constructor() {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(this.pdfDirectory)) {
      fs.mkdirSync(this.pdfDirectory);
    }
  }

  createPDF(filename: string, buffer: Buffer): PDF {
    const id = (this.pdfs.length + 1).toString();
    const filePath = path.join(this.pdfDirectory, `${filename}`);
    
    console.log(filePath)
    // Write the file to the directory
    fs.writeFileSync(filePath, buffer);
    const pdf: PDF = { id, filename, path: filePath };
    this.pdfs.push(pdf);
    return pdf;
  }

  getPDFs(): PDF[] {
    return this.pdfs;
  }
}

