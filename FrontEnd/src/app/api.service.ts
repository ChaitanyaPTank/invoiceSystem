import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  API = 'http://localhost:8080/api'

  getProducts() {
    return this.http.get(`${this.API}/getProducts`);
  }

  addProduct(data: any) {
    return this.http.post(`${this.API}/addProduct`, data);
  }

  getCategories() {
    return this.http.get(`${this.API}/getCategories`);
  }

  addTax(data: any) {
    return this.http.post(`${this.API}/createTax`, data);
  }

  getTaxes() {
    return this.http.get(`${this.API}/getTaxes`);
  }

  addCategory(data: any) {
    return this.http.post(`${this.API}/createCategory`, data);
  }

  getQR(amount?: any) {
    return this.http.post(`${this.API}/getQR`, { amount });
  }

  generateInvoice(total: Number, products: any, customerName: string) {
    return this.http.post(`${this.API}/generateInvoice`, { items: products, total, customerName });
  }
}
