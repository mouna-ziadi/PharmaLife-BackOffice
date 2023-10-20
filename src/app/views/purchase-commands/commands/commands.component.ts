import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Command } from 'app/models/CommandPurchase/command';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { CommandService } from './command.service';



export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
};


@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {


   //stat
 hashMapUserRole:  Map<String, number> = new Map<string, number>();
 @ViewChild("chart") chart: ChartComponent;
 public chartOptions: Partial<ChartOptions>;
 hashMapDonationStatus:  Map<String, number> = new Map<string, number>();




   
 result!:any[]
 keys!:any[]
 values!:any[]



  public deleteCommand?: Command;
  public editCommand?: Command;
  commands: Command[];
  totalCommand: number;



  constructor(private commandService: CommandService,private router: Router) { }

  ngOnInit(): void {
    this.getCommands(); 
   
  }



  private statisticsDonationStatus(){
    this.commandService.statisticsCommandStatus().subscribe(data=>{
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
  










 

  private getCommands(){
    this.commandService.getCommandsList().subscribe(data => {
       this.commands = data;
       this.totalCommand= this.commands.length;

     
    });
  }

  public onAddCommand(addForm: NgForm): void {
    document.getElementById('add-Command-form')!.click();
    this.commandService.createCommand(addForm.value).subscribe(
      (response: Command) => {
        console.error
        console.log(response);
        this.getCommands();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

   public onDeleteCommand(idCommand: number): void {
    this.commandService.deleteCommand(idCommand).subscribe(() => { this.getCommands() }
    
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    };
  } 


  public onUpdateCommand(command: Command) {
    this.commandService.updateCommand(command).subscribe(
      (response: Command) => {
        console.log(response);
        this.getCommands();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  
  


  public onOpenModal(command: Command, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    
    
    if (mode === 'add') {
  
      button.setAttribute('data-target', '#addCommandModal');
    }
    if (mode === 'delete') {
      this.deleteCommand = command;
      button.setAttribute('data-target', '#deleteCommandModal');
    }
    if (mode === 'edit') {
      this.editCommand = command;
      button.setAttribute('data-target', '#updateCommandModal');
    }

  
    container?.appendChild(button);
    button.click();
  }


 

}
