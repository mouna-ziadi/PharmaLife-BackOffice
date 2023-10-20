import { Component, OnInit } from '@angular/core';
import { DeliveryPerson } from 'app/models/DeliveryPerson/delivery-person';
import { DeliveryPersonService } from './delivery-person.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-delivery-person',
  templateUrl: './delivery-person.component.html',
  styleUrls: ['./delivery-person.component.scss']
})
export class DeliveryPersonComponent implements OnInit {
  public editDeliveryPerson?: DeliveryPerson;
  public deleteDeliveryPerson?: DeliveryPerson;

  deliveryPersons: DeliveryPerson[];

  constructor(private deliveryPersonService: DeliveryPersonService,private router: Router ,private toast: NgToastService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      this.toast.error({detail:'Error',summary:'You are not allowed ! ',position:'tr',duration:2000})
      this.router.navigateByUrl('/login');
      }

    this.getDeliveryPersons();
  }


private getDeliveryPersons(){
  this.deliveryPersonService.getDeliveryPersonsList().subscribe(data => {
     this.deliveryPersons = data;

  });
}



public onAddDeliveryPerson(addForm: NgForm): void {
  document.getElementById('add-DeliveryPerson-form')!.click();
  this.deliveryPersonService.createDeliveryPerson(addForm.value).subscribe(
    (response: DeliveryPerson) => {
      console.error
      console.log(response);
      this.getDeliveryPersons();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onUpdateDeliveryPerson(deliveryPerson: DeliveryPerson) {
  this.deliveryPersonService.updateDeliveryPerson(deliveryPerson).subscribe(
    (response: DeliveryPerson) => {
      console.log(response);
      this.getDeliveryPersons();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteDeliveryPerson(idDeliveryPerson: number): void {
  this.deliveryPersonService.deleteDeliveryPerson(idDeliveryPerson).subscribe(() => { this.getDeliveryPersons() }
  
  ),
  (error: HttpErrorResponse) => {
    alert(error.message);
  };
}

public onOpenModal(deliveryPerson: DeliveryPerson, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'edit') {
    this.editDeliveryPerson = deliveryPerson;
    button.setAttribute('data-target', '#updateDeliveryPersonModal');
  }
  if (mode === 'delete') {
    this.deleteDeliveryPerson = deliveryPerson;
    button.setAttribute('data-target', '#deleteDeliveryPersonModal');
  }
  if (mode === 'add') {

    button.setAttribute('data-target', '#addDeliveryPersonModal');
  }
  container?.appendChild(button);
  button.click();
}


}
