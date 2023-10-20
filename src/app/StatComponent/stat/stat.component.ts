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
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  hashMapUserRole:  Map<String, number> = new Map<string, number>();
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
    
  result!:any[]
  keys!:any[]
  values!:any[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }






}
