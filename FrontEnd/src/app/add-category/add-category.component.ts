import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  name: any;
  tax: any;
  taxes: any;

  ngOnInit(): void {
    this.apiService.getTaxes().subscribe(
      res => { this.taxes = res },
      err => { console.log(err) }
    )
  }

  sendResponse() {
    const data = {
      name: this.name,
      tax: this.tax
    }
    this.apiService.addCategory(data).subscribe(
      res => { console.log(res) },
      err => { console.log(err) }
    )
  }

}
