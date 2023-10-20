import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Donation } from 'app/models/AssociationAndDonation/donation';
import { DonationService } from 'app/views/donation/donation.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

  //stat
 hashMapUserRole:  Map<String, number> = new Map<string, number>();
 @ViewChild("chart") chart: ChartComponent;
 @ViewChild("chartT") chartT: ChartComponent;
 public chartOptions: Partial<ChartOptions>;
 public chartType: Partial<ChartOptions>;
 result!:any[]
 keys!:any[]
 values!:any[]

 searchText:any;
  
  hashMapDonationStatus:  Map<String, number> = new Map<string, number>();
  public editDonation?: Donation;
  public deleteDonation?: Donation;
  public detailsDonation?: Donation;
  donations: Donation[];

  donationsStat: { type: string, count: number }[] = [];



  constructor(private donationService: DonationService,private router: Router) {
    this.statisticsDonationStatus();
    this.statisticsDonationType();
   }

  ngOnInit(): void {
    this.getDonations();
  
    
  }




  private statisticsDonationStatus(){
    this.donationService.statisticsDonationStatus().subscribe(data=>{
      console.log(data);
      
      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartOptions = {
        series:this.values,
        chart: {
          type: "donut"
        },
        labels:this.keys,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      console.log(this.hashMapUserRole);
    })
  }
 

  private statisticsDonationType(){
    this.donationService.statisticsDonationType().subscribe(data=>{
      console.log(data);
      
      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartType = {
        series:this.values,
        chart: {
          type: "donut"
        },
        labels:this.keys,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      console.log(this.hashMapUserRole);
    })
  }
  








  private getDonations(){
    this.donationService.getDonationList().subscribe(data => {
       this.donations = data;
  
    });
  }
  
  public OnDetailsDonation(idDonation: number){
    this.donationService.getDonationById(idDonation).subscribe(
      (response: Donation) => {
        console.log(response);
      });
  }

  
  public onAddDonation(addForm: NgForm): void {
    document.getElementById('add-Donation-form')!.click();
    this.donationService.createDonation(addForm.value).subscribe(
      (response: Donation) => {
        console.error
        console.log(response);
        this.getDonations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onUpdateDonation(donation: Donation) {
    this.donationService.updateDonation(donation).subscribe(
      (response: Donation) => {
        console.log(response);
        this.getDonations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onDeleteDonation(idDonation: number): void {
    this.donationService.deleteDonation(idDonation).subscribe(() => { this.getDonations() }
    
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    };
  }
  
  public onOpenModal(donation: Donation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editDonation = donation;
      button.setAttribute('data-target', '#updateDonationModal');
    }
    if (mode === 'delete') {
      this.deleteDonation = donation;
      button.setAttribute('data-target', '#deleteDonationModal');
    }
    if (mode === 'add') {
  
      button.setAttribute('data-target', '#addDonationModal');
    }
    if (mode === 'detail') {
  
      button.setAttribute('data-target', '#detailDonationModal');
    }

    
  
    container?.appendChild(button);
    button.click();
  }

 

}
