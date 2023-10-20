import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/views/user-management/user.service';
import * as Chartist from 'chartist';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import Chart from 'chart.js/auto';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  hashMapUserRole:  Map<String, number> = new Map<string, number>();
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
    
  result!:any[]
  keys!:any[]
  values!:any[]


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.statisticsRoleUser();
    this.statisticsGenderUser();
    this.statisticsActivationStatusUser();

  }
////EMNA
public statisticsRoleUser(){
  this.userService.statisticsUserRoles().subscribe(data=>{    
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
  })

}
public statisticsGenderUser(){
  this.userService.statisticsUserGender().subscribe(data=>{    
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
  })

}

public statisticsActivationStatusUser(){
  this.userService.statisticsUserActivationStauts().subscribe(data=>{    
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
  })

}
/////


  ////stat


  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal'); 
    if (mode === 'statRole') {
      button.setAttribute('data-target', '#chartRoleModal');
      this.statisticsRoleUser();
    }
    if (mode === 'statGender') {
      button.setAttribute('data-target', '#chartGenderModal');
      this.statisticsGenderUser();
    }
    if (mode === 'status') {
      button.setAttribute('data-target', '#chartStatusModal');
      this.statisticsActivationStatusUser();
    }
    container?.appendChild(button);
    button.click();
  }








}
