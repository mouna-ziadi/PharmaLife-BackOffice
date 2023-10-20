import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Evenement } from 'app/models/EventReservation/event';
import { Reservation } from 'app/models/EventReservation/reservation';
import { EventService } from '../event/event.service';
import { ReservationService } from './reservation.service';
import { RequestService } from '../request/request.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {



  
  
  
  public editReservation?: Reservation;
  public deleteReservation?: Reservation;
  public detailsReservation?: Reservation;
  public yearsReservation?: Reservation;
  reservations: Reservation[];
  a: Reservation[];
  oldreservations: Reservation[];
  idReservation:number;
  public requestReservation?: Request;
  public requestReservationA?: Reservation;
  requests: any;
  totalReservation: number;
  
  constructor(private http: HttpClient,private eventService: EventService,private reservationService: ReservationService,private requestService: RequestService,private router: Router) { }
  selectedReservationId: number;
  events: Evenement[];

  

  newReservation: Reservation = {
    idReservation: 0, dateReservation: null, userReservation: null, codeReservation: null , event: null
    
  };



  ngOnInit(): void {
    this.getReservations(); 
    this.getOldReservations();



    
  }

  private getReservations(){
    this.reservationService.getReservationList().subscribe(data => {
       this.reservations = data;
       this.totalReservation = this.reservations.length;
    });
  }



  onFileSelected(fileReservation: any) {
    const file: File = fileReservation.target.files[0];
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

  private getEvents(){
    this.eventService.getEventList().subscribe(data => {
       this.events = data;
  
    });
  }
  
  private getOldReservations(){
    this.reservationService.getOldReservationList().subscribe(data => {
       this.oldreservations = data;
    });
  }

 /* public OnDetailsReservation(idReservation: number){
    this.reservationService.getReservationById(idReservation).subscribe(
      (response: Reservation) => {
        console.log(response);
      });
  }*/

  public onAddReservation(addForm: NgForm): void {
    document.getElementById('add-Reservation-form')!.click();
    this.reservationService.createReservation(addForm.value).subscribe(
      (response: Reservation) => {
        console.error
        console.log(response);
      
        this.getReservations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onUpdateReservation(reservation: Reservation) {
   
    this.reservationService.updateReservation(reservation).subscribe(
      (response: Reservation) => {
        console.log(response);
        this.getReservations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
 
  

  
  public onDeleteReservation(idReservation: number): void {
    
    
    
   this.reservationService.deleteReservation(idReservation).subscribe(() => { this.getReservations(); }
    
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    };
  }
  
  public onOpenModal(reservation: Reservation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editReservation = reservation;
      button.setAttribute('data-target', '#updateReservationModal');
    }
    if (mode === 'delete') {
      this.deleteReservation = reservation;
      button.setAttribute('data-target', '#deleteReservationModal');
    }
    if (mode === 'add') {
  
      button.setAttribute('data-target', '#addReservationModal');
    }
    if (mode === 'detail') {
      this.detailsReservation = reservation;
      button.setAttribute('data-target', '#detailReservationModal');
    }
  
  
    container?.appendChild(button);
    button.click();
  }



  

 
}
