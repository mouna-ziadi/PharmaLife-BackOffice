import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Evenement } from 'app/models/EventReservation/event';
@Injectable({
  providedIn: 'root'
})
export class EventService {

 
  
   url=environment.apiBaseUrl+"/events";
 
   constructor(private httpClient: HttpClient) { }
   token = localStorage.getItem('token');
   options = {
     headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   };
  
 
   getEventList(): Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>(this.url + '/retrieveAllEvents',this.options);
   }

   createEvent(event: Evenement): Observable<any>{
     return this.httpClient.post(this.url + '/addEvent', event,this.options);
   }

   getEventById(idEvent: number): Observable<Evenement>{
    return this.httpClient.get<Evenement>(`${this.url}/retrieveEvent/${idEvent}`,this.options);
  }

  updateEvent1(idEvent:number, event: Event):Observable<Object>{
    return this.httpClient.put(`${this.url}/updateEvent/${idEvent}`, event,this.options);
  }
  public updateEvent(event: Evenement): Observable<Evenement> {
    return this.httpClient.put<Evenement>(`${this.url+"/updateEvent"}`, event,this.options);
  }

  deleteEvent(idEvent: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/deleteEvent/${idEvent}`,this.options);
  }

  getOldEventList(): Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>(this.url + '/retrieveEventsPlusTroixAns',this.options);
  }
  

  getEventsByLocation(location: string): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(`${this.url}/location/${location}`,this.options);
}

getEventsByName(name: string): Observable<Evenement[]> {
  return this.httpClient.get<Evenement[]>(`${this.url}/name/${name}`,this.options);
}
  

retrieveEventsByTimeRange(beginsAtEvent: string, endsAtEvent: string): Observable<Evenement[]> {
  return this.httpClient.get<Evenement[]>(`${this.url}?beginsAtEvent=${beginsAtEvent}&endsAtEvent=${endsAtEvent}`,this.options);
}


}
