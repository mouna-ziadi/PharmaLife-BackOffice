import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssociationService } from 'app/views/association/association.service';
import { DonationService } from 'app/views/donation/donation.service';
import { RequestService } from 'app/views/request/request.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
//import * as Chart from 'chart.js';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};


@Component({
  selector: 'app-donation-association',
  templateUrl: './donation-association.component.html',
  styleUrls: ['./donation-association.component.scss']
})
export class DonationAssociationComponent implements OnInit {








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
  chartdata: any;

  donationData: any;
  chartNew: any;

  // Declare the document property with the Document type
  document: Document;
  selectedYear: string;
  years: string[];
  constructor(private associationService: AssociationService, private requestService: RequestService,
    private donationService: DonationService, private router: Router,private httpClient: HttpClient) {
    this.statisticsDonationStatus();
    this.statisticsDonationType();

    this.statisticsRequestsStatus();
    this.statisticsRequestsType();

  }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  ngOnInit(): void {

    this.httpClient.get('http://localhost:8082/PharmaLife/donations/statisticsDonationDate1',this.options).subscribe(data => {
      this.donationData = data;
      this.selectedYear = '2023';

      this.createChart(this.selectedYear);
      this.years = Object.keys(this.donationData);
    });
    this.document = document;

    throw new Error('Method not implemented.');
  }


 /* createChart() {
    const labels = Object.keys(this.donationData['2023']); // ['02', '03', '04']
    const data = Object.values(this.donationData['2023']); // [2, 2, 1]
  
    this.chartNew = new Chart('donationChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Donations',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      
    });
  } */
  
  updateChart() {
    const labels = Object.keys(this.donationData[this.selectedYear]);
    const data = Object.values(this.donationData[this.selectedYear]);
  
    this.chartNew.data.labels = labels;
    this.chartNew.data.datasets[0].data = data;
    this.chartNew.update();
  }

  createChart(year: string) {
    const labels = Object.keys(this.donationData[year]);
    const data = Object.values(this.donationData[year]);
    
    if (!this.chartNew) {
      this.chartNew = new Chart('donationChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Donations',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
      });
    } else {
      this.chartNew.data.labels = labels;
      this.chartNew.data.datasets[0].data = data;
      this.chartNew.options.title.text = 'Donations by Month';
      this.chartNew.update();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////









  //////////////////////////////////////////////statDonations//////////////////////////////////////////////////////////////////

  private statisticsDonationStatus() {
    this.donationService.statisticsDonationStatus().subscribe(data => {
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
  }




  private statisticsDonationType() {
    this.donationService.statisticsDonationType().subscribe(data => {
      console.log(data);

      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartType = {
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
  }
  //////////////////////////////////////////////statRequests//////////////////////////////////////////////////////////////////


  private statisticsRequestsStatus() {
    this.requestService.statisticsRequestsStatus().subscribe(data => {
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


  private statisticsRequestsType() {
    this.requestService.statisticsRequestsType().subscribe(data => {
      console.log(data);

      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartRtType = {
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
  }


























}
