import { User } from "../User/user"; 

export class Reservation {
    idReservation?: number;
    dateReservation: Date;
    userReservation: User[];
    codeReservation : number;
    event: Event;

    
  }