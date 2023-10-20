import { Component, OnInit } from '@angular/core';
import { Gift } from '../../models/Gift/gift';
import { GiftService } from '../gift-management/gift.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ReclamationService } from './reclamation.service';
import { Reclamation } from '../../models/Reclamation/reclamation';

@Component({
  selector: 'app-reclamation-management',
  templateUrl: './reclamation-management.component.html',
  styleUrls: ['./reclamation-management.component.css']
})
export class ReclamationManagementComponent implements OnInit {

  constructor(private rs:ReclamationService,private router:Router,toast:NgToastService) { }
  reclamations:Reclamation[];
  detailsReclamation:Reclamation;
  searchText: any;

  
  ngOnInit(): void {
    this.getReclamations();
  }
  getReclamations(){
    this.rs.getAllReclamations().subscribe(data => {
      this.reclamations = data;
    });
    
  }
  public OnDetailsProduct(idReclamation: number){
    this.rs.OnDetailsReclamation(idReclamation).subscribe(
      (response: Reclamation) => {
        console.log(response);
      });
  }

  public onOpenModal(reclamation: Reclamation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   
    if(mode == 'details'){
      this.detailsReclamation = reclamation;
      button.setAttribute('data-target', '#reclamationDetailsModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
