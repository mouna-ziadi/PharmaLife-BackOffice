import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../request/request.service';
import { EventService } from './event.service';
import { Evenement } from 'app/models/EventReservation/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {


  
  
  
  public editEvent?: Evenement;
  public deleteEvent?: Evenement;
  public detailsEvent?: Evenement;
  public yearsEvent?: Evenement;
  events: Evenement[];
  a: Evenement[];
  idEvent:number;
  public requestEvent?: Request;
  public requestEventA?: Evenement;
  requests: any;
  totalEvent: number;
  searchLocation :string ;
  searchBy :string ;
  searchValue: string;
  searchBeginsAtEvent: Date;
  searchEndsAtEvent: Date;
  constructor(private http: HttpClient,private eventService: EventService,private requestService: RequestService,private router: Router) { 




  }
  searchText:any;




  


  ngOnInit(): void {
    this.getEvents(); 



  }

  private getEvents(){
    this.eventService.getEventList().subscribe(data => {
       this.events = data;
       this.totalEvent = this.events.length;
    });
  }

  searchEventsByLocation() {
    this.eventService.getEventsByLocation(this.searchLocation).subscribe(
        events => this.events = events,
        error => console.log(error)
    );
}

searchEvents() {
  if (this.searchBy === 'location') {
      this.eventService.getEventsByLocation(this.searchValue).subscribe(
          events => this.events = events,
          error => console.log(error)
      );
  } else if (this.searchBy === 'name') {
      this.eventService.getEventsByName(this.searchValue).subscribe(
          events => this.events = events,
          error => console.log(error)
      );
  }
  else if (this.searchBy === 'time') {
    let beginsAtEvent = new Date(this.searchBeginsAtEvent).toISOString();
    let endsAtEvent = new Date(this.searchEndsAtEvent).toISOString();
    this.eventService.retrieveEventsByTimeRange(beginsAtEvent, endsAtEvent).subscribe(
      events => this.events = events,
      error => console.log(error)
    );
  }
}


  onFileSelected(fileEvent: any) {
    const file: File = fileEvent.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file, file.name);
      this.http.post('/api/upload', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully');
          // Handle the response from the server as needed
        },
        (error) => {
          console.error('Error uploading file', error);
          // Handle the error as needed
        }
      );
    }
  }



 /* public OnDetailsEvent(idEvent: number){
    this.eventService.getEventById(idEvent).subscribe(
      (response: Event) => {
        console.log(response);
      });
  }*/

  public onAddEvent(addForm: NgForm): void {
    document.getElementById('add-Event-form')!.click();
    this.eventService.createEvent(addForm.value).subscribe(
      (response: Evenement) => {
        console.error
        console.log(response);
        this.getEvents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onUpdateEvent(event: Evenement) {
    this.eventService.updateEvent(event).subscribe(
      (response: Evenement) => {
        console.log(response);
        this.getEvents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
 
  

  
  public onDeleteEvent(idEvent: number): void {
    
    
    
    if (confirm('Are you sure you want to delete this event?')) { this.eventService.deleteEvent(idEvent).subscribe(() => { this.getEvents(); }
    
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    }; }
  }
  
  public onOpenModal(event: Evenement, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editEvent = event;
      button.setAttribute('data-target', '#updateEventModal');
    }
    if (mode === 'delete') {
      this.deleteEvent = event;
      button.setAttribute('data-target', '#deleteEventModal');
    }
    if (mode === 'add') {
  
      button.setAttribute('data-target', '#addEventModal');
    }
    if (mode === 'detail') {
      this.detailsEvent = event;
      button.setAttribute('data-target', '#detailEventModal');
    }
  
  
    container?.appendChild(button);
    button.click();
  }


 
}
