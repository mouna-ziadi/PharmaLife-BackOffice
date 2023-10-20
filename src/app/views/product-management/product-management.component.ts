import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from '../../models/Product/product';
import {  ApexChart, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { Category } from '../../models/Category/category';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};





@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],

})
export class ProductManagementComponent implements OnInit {
  [x: string]: any;

  hashMapProductCategory: Map<String, number> = new Map<string, number>();
  hashMapProductExpiration: Map<String, number> = new Map<string, number>();

  @ViewChild("chartProductCategory") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartProductExpiration") chartProductExpiration: ChartComponent;
  public chartOptionsApex: Partial<ChartOptions>;




  result!: any[]
  productsExpired: Product[];
  productsNotExpired: Product[];
  allProducts: Product[];
  detailsProduct?: Product;
  keys!: any[]
  values!: any[]
  searchText: any;

  constructor(private ps: ProductService, router: Router, private toast: NgToastService) {
    this.statisticsProductCategory();
    this.statisticsProductExpiration();

  }



  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.keys);
  }
  private statisticsProductExpiration() {
    this.ps.statisticsProductExpiration().subscribe(data => {
      console.log(data);
      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      this.chartOptionsApex = {
        series: this.values,
        chart: {
          type: "donut"
        },
        labels: this.keys,
        responsive: [
          {
            breakpoint: 400,
            options: {
              chart: {
                width: 50
              },
              legend: {
                position: "right"
              }
            }
          }
        ]
      };
    })
  }

  private statisticsProductCategory() {
    this.ps.statisticsProductCategory().subscribe(data => {
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
            breakpoint: 400,
            options: {
              chart: {
                width: 50
              },
              legend: {
                position: "left"
              }
            }
          }
        ]
      };

      console.log(this.hashMapProductCategory);
    })
  }



  private getAllProducts() {
    this.ps.getAllProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

  public OnDetailsProduct(idProduct: number) {
    this.ps.OnDetailsProduct(idProduct).subscribe(
      (response: Product) => {
        console.log(response);
      });
  }

  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode == 'details') {
      this.detailsProduct = product;
      button.setAttribute('data-target', '#productDetailsModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public getDateDiffInDays(dateString1: string, c: Category): String {
    const date1 = new Date(dateString1);
    const date2 = new Date();
    const diffMs = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if ((date2 < date1) && (c.archived)) {
      return "Still available for " + diffDays + " days." + "\n" +
        "Category is archived";
    }
    if ((date2 < date1) && (!c.archived)) {
      return "Still available for " + diffDays + " days." + "\n" +
        "Category is available";
    }
    else {
      return "Expired " + diffDays + " days ago.";
    }
  }
}
