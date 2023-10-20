import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/User/user';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Chart from 'chart.js/auto';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { createClient } from '@supabase/supabase-js';
import { Role } from 'app/models/User/role';

const supabaseUrl = 'https://nwkxroquvbmhbchbkbjk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53a3hyb3F1dmJtaGJjaGJrYmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzMjQ4MTYsImV4cCI6MTk5ODkwMDgxNn0.2JdZTjvuXGIHJ_gfcohLMM-I22pGBSlLEQiNwI9Hoto';

const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public editUser?: User;
  public deleteUser?: User;
  public detailsUser?: User;
  users: User[];
  roleFilter: Role = null;
  selectedRole: string;



  searchText:any;

  userFile : any;
  public imagePath: any;
  imgURL: any;
  public message: string;



  pageSize = 4; // maximum number of items to display per page
  totalPages: number; // total number of pages
  currentPage = 1; // current page number


  roleStatistics: RoleStatistics[];
  private baseURL = environment.apiBaseUrl;
  UserToken = localStorage.getItem('token');



   /////
   selectedFile: File;
   selectedFileUrl: string | null = null;
   /////
   avatarUrl: string = '';

   UserData: any;
   chartNew: any;
   document: Document;
   selectedYear: string;
   years: string[];
  constructor(private userService: UserService,private router: Router,private toast: NgToastService,private httpClient: HttpClient, private jwtHelper: JwtHelperService ) {

   }

  ngOnInit(): void {

    const decodedToken = this.jwtHelper.decodeToken(this.UserToken);
     //const rolesUser = decodedToken.roles;
    // const adminRole = rolesUser[0];
      // console.log(adminRole);

    if(this.UserToken == null ){
       this.toast.error({detail:'Error',summary:'You are not allowed ! ',position:'tr',duration:2000})
       this.router.navigateByUrl('/login');
       }
    this.getUsers();

        

    this.userService.getCreatedAtStatisticsByDate().subscribe(data => {
      this.UserData = data;
      this.selectedYear = '2023';
      console.log("pst",this.selectedYear)
      this.createChart(this.selectedYear);
      this.years = Object.keys(this.UserData);
    });
    this.document = document;
  }

////
public onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = file;
      this.selectedFileUrl = reader.result as string;
    };
  }
  
}

searchUsersByRole() {
  this.userService.getUsersByRole(this.selectedRole)
    .subscribe(users => this.users = users);
}

public onAddUser(addForm: NgForm): void {
  document.getElementById('add-User-form')!.click();
  this.userService.createUser(addForm.value).subscribe(
    (response: User) => {
      console.error
      console.log(response);
      this.getUsers();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
////
updateChart() {
  const labels = Object.keys(this.UserData[this.selectedYear]);
  const data = Object.values(this.UserData[this.selectedYear]);
  console.log(labels , data);
  this.chartNew.data.labels = labels;
  this.chartNew.data.datasets[0].data = data;
  this.chartNew.update();
}

createChart(year: string) {
  const labels = Object.keys(this.UserData[year]);
  const data = Object.values(this.UserData[year]);
  
  if (!this.chartNew) {
    this.chartNew = new Chart('UserChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Statistics of users registration',
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
    this.chartNew.options.title.text = 'User by Month';
    this.chartNew.update();
  }
}



/////





/*private getUsers(){
  this.userService.getUsersList().subscribe(data => {
     this.users = data;

  });
}*/

getUsers() {
 
    this.userService.getUsersList().subscribe(users => this.users = users,);
  
}

onRoleFilterChanged(role: Role) {
  this.roleFilter = role;
  this.getUsers();
}



public OnDetailsUser(idUser: number){
  this.userService.getUserById(idUser).subscribe(
    (response: User) => {
      this.avatarUrl = `https://nwkxroquvbmhbchbkbjk.supabase.co/storage/v1/object/avatars/${response.image_user}`;
      console.log(response);
    });
}

/*public onAddUser(addForm: NgForm): void {
  document.getElementById('add-User-form')!.click();
  this.userService.createUser(addForm.value).subscribe(
    (response: User) => {
      console.error
      console.log(response);
      this.getUsers();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}*/
/*prepareFormData(user: User) {
  const formdata = new FormData();
  this.productToAdd.ProductImages.forEach(image => {
    formdata.append('image',
      image.file,
      image.file.name);
  });
  formdata.append(
    'user',
    new Blob([JSON.stringify(user)], {type: 'application/json'})
  )
  return formdata;
}*/

/*onFileSelected(event: any) {
  if (event.target.files) {
    const files = event.target.files;
    for (let file of files) {
      const image: Image = {
        file: file,
        url: false
      }
      this.productToAdd.ProductImages.push(image);
    }
  }
}*/





public onUpdateUser(user: User) {
  this.userService.updateUser(user).subscribe(
    (response: User) => {
      console.log(response);
      this.toast.success({detail:'Success',summary:'Successfully updated !',position:'tr',duration:2000})
      this.getUsers();
    },(error) => {
      //alert(error.message);
    if (error.status === 403) {
      this.toast.error({detail:'Error',summary:'Your are not authorized to do this action .',position:'tr',duration:3000})

    } else  {
      this.toast.error({detail:'Error',summary:'Something wrong !',position:'tr',duration:2000})    }

    }
  );
}


public onDeleteUser(idUser: number): void {
  this.userService.deleteUser(idUser).subscribe(() => { 
    
    this.toast.success({detail:'Success',summary:'Successfully deleted !',position:'tr',duration:2000})

    this.getUsers() }

  ),
  (error: HttpErrorResponse) => {
    //alert(error.message);
    this.toast.error({detail:'Error',summary:'Something wrong !',position:'tr',duration:2000})

  };
}

public onOpenModal(user: User, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'edit') {
    this.editUser = user;
    button.setAttribute('data-target', '#updateUserModal');
  }
  if (mode === 'delete') {
    this.deleteUser = user;
    button.setAttribute('data-target', '#deleteUserModal');
  }
  if(mode == 'details'){
    this.detailsUser = user;
    button.setAttribute('data-target', '#userDetailsModal');
  }
  if (mode === 'add') {

    button.setAttribute('data-target', '#addUserModal');
  }
  container?.appendChild(button);
  button.click();
}











}
