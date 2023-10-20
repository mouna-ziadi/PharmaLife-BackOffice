import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reclamation } from '../../models/Reclamation/reclamation';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  
  private baseURL = "http://localhost:8082/PharmaLife/Reclamation";

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  getAllReclamations(): Observable<Reclamation[]>{
    return this.httpClient.get<Reclamation[]>(`${this.baseURL}`+"/all-reclamations", this.options);
  }
  OnDetailsReclamation(idReclamation: number): Observable<Reclamation>{
    return this.httpClient.get<Reclamation>(`${this.baseURL}`+"/retrieve-reclamation/"+`${idReclamation}`,this.options);
  }

}
