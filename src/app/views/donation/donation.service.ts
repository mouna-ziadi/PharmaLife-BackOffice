import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'app/models/AssociationAndDonation/donation';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DonationService {



  url=environment.apiBaseUrl+"/donations";
  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  
  getDisabledDonations(idRequest): Observable<Donation[]>{
    return this.httpClient.get<Donation[]>(`${this.url}/getDisabledDonations/${idRequest}`,this.options);  
   }

  getDonationList(): Observable<Donation[]>{
   return this.httpClient.get<Donation[]>(this.url + '/retrieveAllDonations',this.options);  
  }

  createDonation(donation: Donation): Observable<any>{
    return this.httpClient.post(this.url + '/addDonation', donation,this.options);
  }

  getDonationById(idDonation: number): Observable<Donation>{
    return this.httpClient.get<Donation>(`${this.url}/retrieveDonation/${idDonation}`,this.options);
  }

  updateDonation1(idDonation:number, donation: Donation):Observable<Object>{
    return this.httpClient.put(`${this.url}/updateDonation/${idDonation}`, donation,this.options);
  } 

  public updateDonation(donation: Donation): Observable<Donation> {
    return this.httpClient.put<Donation>(`${this.url+"/updateDonation"}`, donation,this.options);
  }

  deleteDonation(idDonation: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/deleteDonation/${idDonation}`,this.options);
  }

  statisticsDonationStatus(): Observable<Map<String,number>>{
    return this.httpClient.get<Map<String,number>>(`${this.url}`+"/statisticsDonationStatus/",this.options);
  } 
  statisticsDonationType(): Observable<Map<String,number>>{
    return this.httpClient.get<Map<String,number>>(`${this.url}`+"/statisticsDonationType/",this.options);
  } 

  getDonationStatisticsByDate(): Observable<any> {
    return this.httpClient.get(`${this.url}/statisticsDonationDate1`,this.options);
  }

  getDonationStatisticsByDate1(): Observable<any> {
    return this.httpClient.get(`${this.url}/statisticsDonationDate1`,this.options).pipe(
      map((response: any) => {
        const labels = Object.keys(response);
        const values = Object.values(response).map((innerMap: any) => Object.values(innerMap));
        return { labels, values };
      })
    );
  }
 
  getDonationsByAssociation(idAssociation: number): Observable<Donation>{
    return this.httpClient.get<Donation>(`${this.url}/getDonationsByAssociation/${idAssociation}`,this.options);
  }
  ////////////////////////////////////////////////////

  getDonationStatisticsByDate2(): Observable<any> {
    return this.httpClient.get(`${this.url}/statisticsDonationDate1/`,this.options);
  }

  //Partie Request 
  getDonationsByRequest(idRequest: number): Observable<Donation>{
    return this.httpClient.get<Donation>(`${this.url}/getDonationsByRequest/${idRequest}`,this.options);
  }

  
}
