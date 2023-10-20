import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gift } from '../../models/Gift/gift';
import { Product } from '../../models/Product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private baseURL = "http://localhost:8082/PharmaLife/Gift";

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  
  getAllGifts(): Observable<Gift[]>{
    return this.httpClient.get<Gift[]>(`${this.baseURL}`+"/all-gifts",this.options);
  }

  OnDetailsGift(idGift: number): Observable<Gift>{
    return this.httpClient.get<Gift>(`${this.baseURL}`+"/retrieve-gift/"+`${idGift}`,this.options);
  }

  getAllProductsForGift(idGift:number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}`+"/productsForGift/"+`${idGift}`,this.options);
  }

}
