import { Injectable } from '@angular/core';
import { Product } from '../../models/Product/product';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "http://localhost:8082/PharmaLife/Product";

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getAllProductsExpired(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}` + "/all-productsExpired",this.options);
  }
  getAllProductsNotExpired(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}` + "/all-productsNotExpired",this.options);
  }
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}` + "/all-products",this.options);
  }

  OnDetailsProduct(idProduct: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseURL}` + "/retrieve-product/" + `${idProduct}`,this.options);
  }

  statisticsProductCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}` + "/statisticsProductCategory/",this.options);
  }
  statisticsProductExpiration(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}` + "/statisticsProductExpiration/",this.options);
  }
}
