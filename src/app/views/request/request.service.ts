import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'app/models/AssociationAndDonation/donation';
import { Request } from 'app/models/AssociationAndDonation/request';
import { environment } from 'environments/environment';
import { request } from 'http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url=environment.apiBaseUrl+"/requests";

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  getRequestList(): Observable<Request[]>{
   return this.httpClient.get<Request[]>(this.url + '/retrieveAllRequests',this.options);
   
  }

  getRequestList1(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.url + '/findAllRequestsWhereIdDonationIsNull',this.options);
    
   }

  createRequest(request: Request): Observable<any>{
    return this.httpClient.post(this.url + '/addRequest', request,this.options);
  }

  getRequestById(idRequest: number): Observable<Request>{
    return this.httpClient.get<Request>(`${this.url}/retrieveRequest/${idRequest}`,this.options);
  }

  updateRequest1(idRequest:number, request: Request):Observable<Object>{
    return this.httpClient.put(`${this.url}/updateRequest/${idRequest}`, request,this.options);
  } 

  public updateRequest(request: Request): Observable<Request> {
    return this.httpClient.put<Request>(`${this.url+"/updateRequest"}`, request,this.options);
  }

  deleteRequest(idRequest: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/cancelRequest/${idRequest}`,this.options);
  }

  getListRequestByIdAssociation(idAssociation: number): Observable<Request>{
    return this.httpClient.get<Request>(`${this.url}/getMyRequests/${idAssociation}`,this.options);
  }
  getRequestInProgressList(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.url + '/retrieveAllRequestsInProgress',this.options);
    
   }
   getRequestAcceptedList(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.url + '/retrieveAllRequestsAccepted',this.options);
    
   }
   getRequestRefusedList(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.url + '/retrieveAllRequestsRefused',this.options);
    
   }
   /*assignRequestToDonation(request: Request): Observable<Object> {
    return this.httpClient.put<Request>(`${this.url+"/updateRequestDonation"}`,request);
   }*/


   statisticsRequestsStatus(): Observable<Map<String,number>>{
    return this.httpClient.get<Map<String,number>>(`${this.url}`+"/statisticsRequestStatus/",this.options);
  } 
  statisticsRequestsType(): Observable<Map<String,number>>{
    return this.httpClient.get<Map<String,number>>(`${this.url}`+"/statisticsRequestType/",this.options);
  } 

    //take donation button
    assignRequestToDonation(request: Request, idDonation: number, idAssociation: number): Observable<Request> {
      return this.httpClient.post<Request>(`${this.url}/assignRequestToDonation/${idDonation}/${idAssociation}`, request,this.options);
      //console.log(this.httpClient.post<Request>(`${this.url}/assignRequestToDonation/${idDonation}/${idAssociation}`, request));
    }
  
     //assignRequestToDonationByAdmin
     assignRequestToDonationByAdmin( request: Request, idDonation: number): Observable<Request> {
      return this.httpClient.put<Request>(`${this.url}/assignRequestToDonationByAdmin/${idDonation}`, request,this.options);
      
    }

    //assignDonationToRequestByAdmin
    assignDonationToRequestByAdmin(donation: Donation, idRequest: number): Observable<Request> {
      return this.httpClient.put<Request>(`${this.url}/assignDonationToRequestByAdmin/${idRequest}`, donation,this.options);    
    }
     
}
