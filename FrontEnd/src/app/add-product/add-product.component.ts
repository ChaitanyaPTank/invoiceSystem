import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  price: any;
  name: any;
  category: any = '';
  categories: any;

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => { console.log(err) }
    );
  }

  sendResponse() {
    const data = {
      price: this.price,
      name: this.name,
      category: this.category,
    };
    console.log(data);
    this.apiService.addProduct(data).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    )
  }

}
