import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-taxes',
  templateUrl: './add-taxes.component.html',
  styleUrls: ['./add-taxes.component.css']
})
export class AddTaxesComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) { }

  percentage: any;

  ngOnInit(): void {
  }

  sendResponse() {
    const data = { percentage: this.percentage }
    this.apiService.addTax(data).subscribe(
      response => { console.log(response) },
      err => { console.log(err) }
    )
    console.log(data);
  }
}
