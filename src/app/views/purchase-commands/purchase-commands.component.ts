import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';

import * as Chart from 'chart.js';
import { CommandService } from './commands/command.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};



@Component({
  selector: 'app-purchase-commands',
  templateUrl: './purchase-commands.component.html',
  styleUrls: ['./purchase-commands.component.scss']
})
export class PurchaseCommandsComponent implements OnInit {

  //stat
  hashMapUserRole: Map<String, number> = new Map<string, number>();
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("chartT") chartT: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartType: Partial<ChartOptions>;
  //requests
  hashMapRequestStatus: Map<String, number> = new Map<string, number>();
  hashMapRequestType: Map<String, number> = new Map<string, number>();
  @ViewChild("chartRequestStatus") chartRequestStatus: ChartComponent;
  @ViewChild("chartRequestType") chartRequestType: ChartComponent;
  public chartRtStatus: Partial<ChartOptions>;
  public chartRtType: Partial<ChartOptions>;




  result!: any[]
  keys!: any[]
  values!: any[]

  hashMapDonationStatus: Map<String, number> = new Map<string, number>();

  donationStatistics: any;

  constructor(private commandService: CommandService, private router: Router) {
    
    this.statisticsCommandStatus();

  }
  ngOnInit(): void {

    throw new Error('Method not implemented.');
  }



   //////////////////////////////////////////////statRequests//////////////////////////////////////////////////////////////////


   private statisticsCommandStatus() {
    this.commandService.statisticsCommandStatus().subscribe(data => {
      console.log(data);

      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartRtStatus = {
        series: this.values,
        chart: {
          type: "donut"
        },
        labels: this.keys,
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
      console.log(this.hashMapRequestStatus);
    })
  }


  






 

 
}
