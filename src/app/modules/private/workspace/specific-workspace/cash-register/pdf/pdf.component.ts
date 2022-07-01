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
      console.log(this.products,"poductos")
    };
  };
}
