import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Association } from 'app/models/AssociationAndDonation/association';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

 
  
   url=environment.apiBaseUrl+"/associations";
 
   constructor(private httpClient: HttpClient) { }
   token = localStorage.getItem('token');
   options = {
     headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   };
  
 
   getAssociationList(): Observable<Association[]>{
    return this.httpClient.get<Association[]>(this.url + '/retrieveAllAssociations',this.options);
   }

   createAssociation(association: Association): Observable<any>{
     return this.httpClient.post(this.url + '/addAssociation', association,this.options);
   }

   getAssociationById(idAssociation: number): Observable<Association>{
    return this.httpClient.get<Association>(`${this.url}/retrieveAssociation/${idAssociation}`,this.options);
  }

  updateAssociation1(idAssociation:number, association: Association):Observable<Object>{
    return this.httpClient.put(`${this.url}/updateAssociation/${idAssociation}`, association,this.options);
  }
  public updateAssociation(association: Association): Observable<Association> {
    return this.httpClient.put<Association>(`${this.url+"/updateAssociation"}`, association,this.options);
  }

  deleteAssociation(idAssociation: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/deleteAssociation/${idAssociation}`,this.options);
  }

  getOldAssociationList(): Observable<Association[]>{
    return this.httpClient.get<Association[]>(this.url + '/retrieveAssociationsPlusTroixAns',this.options);
  }

  

}
