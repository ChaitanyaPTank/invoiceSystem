import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface Items {
  no: Number,
  name: String,
  price: Number,
  tax: Number,
  total: Number,
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('canvas')
  image!: ElementRef;

  tableData: Items[] = [];


  // tData: Items[] = [
  //   { name: 'This', price: 10, tax: 1, total: 100 },
  //   { name: 'This', price: 10, tax: 1, total: 100 },
  //   { name: 'This', price: 10, tax: 1, total: 100 },
  //   { name: 'This', price: 10, tax: 1, total: 100 },
  // ]

  constructor(
    private apiService: ApiService
  ) { }

  products: any = '';
  displayColumns: string[] = ['No', 'Product', 'Quantity', 'Price', 'Tax', 'Total',];
  dataSource = new MatTableDataSource<Items>();
  selectedItem: any = null;
  grandTotal: Number = 0;
  body: any;
  pdf: boolean = false;
  qr: any;
  customerName = '';
  quantity = 1;
  canvas: any;

  ngOnInit(): void {
    this.body = document.getElementById('pdf');
    this.apiService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        data.forEach((item: any) => {
          const row: any = {};
        });
        this.dataSource.data = this.tableData;
        console.log(this.tableData)
      },
      err => {
        console.log(err);
      }
    )
  }

  submitButton() {
    console.log(this.selectedItem);
    const index = this.products.findIndex((item: any) => {
      if (this.selectedItem === null) return;
      return item._id === this.selectedItem;
    });
    console.log(index)
    if (index === -1) return;
    const row: any = {};
    row.no = this.tableData.length + 1;
    row._id = this.products[index]._id;
    row.name = this.products[index].name;
    row.price = this.products[index].price;
    row.quantity = this.quantity;
    row.tax = (this.products[index].price * (this.products[index].category.tax.percentage / 100));
    row.total = (row.price * this.quantity) + (row.tax * this.quantity);
    this.tableData.push(row);
    this.dataSource.data = this.tableData;
  }

  del() {
    console.log(this.dataSource);
    this.tableData.pop();
    this.dataSource.data = this.tableData;
  }

  invoice() {
    this.grandTotal = 0;
    console.log(this.tableData)
    const gTotal = this.tableData.reduce((acc: Number, cv: any) => {
      return acc + cv.total;
    }, 0);

    console.log(gTotal);
    this.grandTotal = gTotal;
    if (gTotal <= 0) {
      return alert('Total is 0, can not proceed');
    }

    const total = this.grandTotal;
    const products = this.tableData.map((val: any) => val._id);
    const customerName = this.customerName;
    document.getElementById('i-canvas')?.setAttribute('width', '900');

    this.apiService.generateInvoice(total, products, customerName).subscribe(
      (data: any) => {
        console.log(data);
        if (data.total) {
          this.apiService.getQR(gTotal).subscribe(
            (data: any) => {
              console.log(data);
              this.qr = data;
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
      },
      err => console.log(err)
    );

  }
  convertToPDF() {
    this.pdf = true;
    html2canvas(this.image.nativeElement, { scrollY: -window.scrollY, scrollX: -window.scrollX, windowHeight: this.image.nativeElement.offsetHeight }).then(canvas => {

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      console.log(canvas.height)
      console.log(canvas.width)
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      const image = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(image, marginX, 0, canvasWidth, canvasHeight);

      // const pdf = new jsPDF({ orientation: 'portrait', format: [900, 600], unit: 'px' })
      // pdf.html(this.image.nativeElement, {
      //   callback:
      //     (pdf) => {
      //       var iframe = document.createElement('iframe');
      //       iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:1200px');
      //       document.body.appendChild(iframe);
      //       iframe.src = pdf.output('datauristring');
      //     }
      //   })
      pdf.save('converted.pdf');
    })
  }

}
