import { Component, OnInit } from '@angular/core';
import { GiftService } from './gift.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Gift } from '../../models/Gift/gift';
import { Product } from '../../models/Product/product';
import { Category } from '../../models/Category/category';

@Component({
  selector: 'app-gift-management',
  templateUrl: './gift-management.component.html',
  styleUrls: ['./gift-management.component.css']
})
export class GiftManagementComponent implements OnInit {

  constructor(private gs:GiftService ,router:Router,private toast: NgToastService) { }
  gifts:Gift[];
  detailsGift?:Gift;
  productsForOneGift?:any;
  searchText: any;

  ngOnInit(): void {
    this.getGifts();
   // console.log(this.productsForOneGift);
  }
  getGifts(){
    this.gs.getAllGifts().subscribe(data => {
      this.gifts = data;
      console.log(this.gifts );

    });
  }

  public OnDetailsGift(idgift: number){
    this.gs.OnDetailsGift(idgift).subscribe(
      (response: Gift) => {
        console.log(response);
      });
  }  

  public getAllProductsForGift(idGift:number){
    this.gs.getAllProductsForGift(idGift).subscribe(data => {
      this.productsForOneGift = data;
      console.log(data);
    });
  }
  
  public onOpenModal(gift: Gift, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   
    if(mode == 'details'){
      this.detailsGift = gift;
      button.setAttribute('data-target', '#giftDetailsModal');
    }
    if(mode == 'productsForGift'){
      this.getAllProductsForGift(gift.idGift);
      this.toast.success({detail:'Success',summary:'List of products for gift',position:'tr',duration:2000})
      button.setAttribute('data-target', '#productsForGiftModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public getDateDiffInDays(dateString1: string,c:Category): String {
    const date1 = new Date(dateString1);
    const date2 = new Date();
    const diffMs = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if((date2< date1)&&(c.archived)){
      return "Still available for "+diffDays+" days."+"\n"+
          "Category is archived";
    }
    if((date2< date1)&&(!c.archived)){
      return "Still available for "+diffDays+" days."+"\n"+
          "Category is available";
    }
    else{
    return "Expired "+diffDays+" days ago.";
    }
  }
}
