import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'app/models/EventReservation/reservation';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

 
  
   url=environment.apiBaseUrl+"reservations";
 
   constructor(private httpClient: HttpClient) { }
   token = localStorage.getItem('token');
   options = {
     headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   };
  
 
   getReservationList(): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(this.url + '/retrieveAllReservations',this.options);
   }

   createReservation(reservation: Reservation): Observable<any>{
     return this.httpClient.post(this.url + '/addReservation', reservation,this.options);
   }

   getReservationById(idReservation: number): Observable<Reservation>{
    return this.httpClient.get<Reservation>(`${this.url}/retrieveReservation/${idReservation}`,this.options);
  }

  updateReservation1(idReservation:number, reservation: Reservation):Observable<Object>{
    return this.httpClient.put(`${this.url}/updateReservation/${idReservation}`, reservation,this.options);
  }
  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(`${this.url+"/updateReservation"}`, reservation,this.options);
  }

  deleteReservation(idReservation: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/deleteReservation/${idReservation}`,this.options);
  }

  getOldReservationList(): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(this.url + '/retrieveReservationsPlusTroixAns',this.options);
  }
  

}
