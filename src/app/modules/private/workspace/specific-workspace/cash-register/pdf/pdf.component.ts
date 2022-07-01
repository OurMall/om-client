import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from '@app/common/interfaces';
import { InvoiceService } from '@app/common/services';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  title = 'FrontPrueba';
  public invoices!: Invoice;

  public invoice!: any[];
  public id_client!:string;
  public products!: any[];
  public total_price!:number;
  public priceDollar!: number;
  public dollarInPeso!: number;


  constructor(
    private apiInvoice: InvoiceService,
  ) {
    this.getInvoiceStorage();
  };

  ngOnInit(): void {
    console.log(this.dollarInPeso,'precio en pesos')

  };

  receiveInovice($event:Invoice) {
    this.invoices = $event;
  };


 



  getInvoiceStorage() {
    let total_price = localStorage.getItem('total_price');
    this.total_price = Number(total_price);
    let products = localStorage.getItem('product');
    if (products == null) {
      this.products = [];
    } else {
      this.products = JSON.parse(products);
    };
  };

 



  makePDF() {
    const DATA:any = document.getElementById('htmlInvoice');
    const PDF = new jsPDF('p', 'pt', 'a4');
    const OPTIONS = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, OPTIONS).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (PDF as any).getImageProperties(img);
      const pdfWidth = PDF.internal.pageSize.getWidth() -2 * bufferX;
      const pdHeight = (imgProps.height * pdfWidth) / imgProps.width;
      PDF.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdHeight,
        undefined,
        'FAST'
      );
      return PDF;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_invoice.pdf`);
    });
  };
}
