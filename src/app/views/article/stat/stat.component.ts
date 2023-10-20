import { Component, ViewChild } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';

import * as Chart from 'chart.js';
import { ArticleComponent } from '../article.component';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {
 
 
   constructor(private articleservice: ArticleService, private router: Router) {
     //this.statisticsDonationStatus();

 
   }
   ngOnInit(): void {
 
     throw new Error('Method not implemented.');
   }
/*
   private statisticsDonationStatus() {
    this.articleservice.statisticsArticlesByName().subscribe(data => {
      console.log(data);

      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartOptions = {
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
      console.log(this.hashMapUserRole);
    })
  }*/
 

}
