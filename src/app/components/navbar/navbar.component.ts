import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'app/models/User/user';
import { UserService } from 'app/views/user-management/user.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit {
      private listTitles: any[];
      location: Location;
        mobile_menu_visible: any = 0;
      private toggleButton: any;
      private sidebarVisible: boolean;
      public userName : String;
      UserToken = localStorage.getItem('token');
      userModalVisible = false;
      currentUser: any;
      idUser: any;
  
      user: User[];
      public editUser?: User;
  
      constructor(private userService: UserService ,location: Location,  private element: ElementRef, private router: Router,private toast: NgToastService, private jwtHelper: JwtHelperService) {
        this.location = location;
            this.sidebarVisible = false;
      }
     
      ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        
          const decodedToken = this.jwtHelper.decodeToken(this.UserToken);
          const lastName = decodedToken.lastName;
          const firstName = decodedToken.firstName;
          this.userName=lastName+" "+firstName;
          const rolesUser = decodedToken.roles;
          const adminRole = rolesUser[0];
          const idUser = decodedToken.idUser;
  
          if( this.UserToken == null && adminRole!="Admin"){
              this.toast.error({detail:'Error',summary:'You are not allowed ! ',position:'tr',duration:2000})
              this.router.navigateByUrl('/login');
              }
  
  
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
           var $layer: any = document.getElementsByClassName('close-layer')[0];
           if ($layer) {
             $layer.remove();
             this.mobile_menu_visible = 0;
           }
       });
  
       
     
  
      }
  
  
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const body = document.getElementsByTagName('body')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);
  
          body.classList.add('nav-open');
  
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const body = document.getElementsByTagName('body')[0];
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          body.classList.remove('nav-open');
      };
      sidebarToggle() {
          // const toggleButton = this.toggleButton;
          // const body = document.getElementsByTagName('body')[0];
          var $toggle = document.getElementsByClassName('navbar-toggler')[0];
  
          if (this.sidebarVisible === false) {
              this.sidebarOpen();
          } else {
              this.sidebarClose();
          }
          const body = document.getElementsByTagName('body')[0];
  
          if (this.mobile_menu_visible == 1) {
              // $('html').removeClass('nav-open');
              body.classList.remove('nav-open');
              if ($layer) {
                  $layer.remove();
              }
              setTimeout(function() {
                  $toggle.classList.remove('toggled');
              }, 400);
  
              this.mobile_menu_visible = 0;
          } else {
              setTimeout(function() {
                  $toggle.classList.add('toggled');
              }, 430);
  
              var $layer = document.createElement('div');
              $layer.setAttribute('class', 'close-layer');
  
  
              if (body.querySelectorAll('.main-panel')) {
                  document.getElementsByClassName('main-panel')[0].appendChild($layer);
              }else if (body.classList.contains('off-canvas-sidebar')) {
                  document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
              }
  
              setTimeout(function() {
                  $layer.classList.add('visible');
              }, 100);
  
              $layer.onclick = function() { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function() {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
              }.bind(this);
  
              body.classList.add('nav-open');
              this.mobile_menu_visible = 1;
  
          }
      };
  
      getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
  
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
      }
  
      public onUpdateUser(user: User) {
          this.userService.updateUser(user).subscribe(
            (response: User) => {
              console.log(response);
              this.toast.success({detail:'Success',summary:'Successfully updated !',position:'tr',duration:2000})
            },(error) => {
              //alert(error.message);
            if (error.status === 403) {
              this.toast.error({detail:'Error',summary:'Your are not authorized to do this action .',position:'tr',duration:3000})
        
            } else  {
              this.toast.error({detail:'Error',summary:'Something wrong !',position:'tr',duration:2000})    }     
            }
          );
        }
  
        loadUsers() {
          this.userService.getUserById(this.idUser).subscribe((user) => {
            
          });
        }
  
  
        
  
        showUserModal() {        
          this.userService.getUserById(this.idUser).subscribe((user) => {
            this.currentUser = user;
            this.userModalVisible = true;
          });
        }
  
      onLogout() {
          localStorage.removeItem('token');
  
          this.router.navigate(['/login']);
      }
  }
  