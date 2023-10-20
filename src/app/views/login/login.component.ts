import { Component, OnInit } from '@angular/core';
import { UserLogin } from './user-login';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user:UserLogin = new UserLogin();
  loginAttempts = 0;
  errorMessage: string;


  constructor(private fb: FormBuilder, private service: LoginService, private route: Router, private toast: NgToastService) { }
    /*formModel = {
      email: '',
      password: ''
    }  */
    formModel: FormGroup;

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
   // alert("you are not allowed")
    this.route.navigateByUrl('');
    }
    this.formModel = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  onSubmit() {
    if (this.formModel.valid) {
      this.service.login(this.formModel.value).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.access_token);
          this.toast.success({detail:'Success',summary:'You are successfully logged in !',position:'tr',duration:2000})
          this.route.navigateByUrl('');       
        },
        (error) => {
          // handle login error
          if (error.status === 401 && error.error === 'Invalid email/password') {
            this.toast.error({detail:'Error',summary:'Invalid email/password. Please try again.',position:'tr',duration:3000})

          } else if (error.status === 401 && error.error === 'Your account is not enabled. Please verify your account.') {
            this.toast.error({detail:'Error',summary:'Your account is not enabled. Please verify your account.',position:'tr',duration:3000})

          } else  {
            this.toast.error({detail:'Error',summary:'Your account has been locked for 24 Hours',position:'tr',duration:3000})
          } 
          

        this.route.navigate(['/login']);
        }
      );
    }
  }

  onLogout() {
    localStorage.removeItem('token');  
    this.route.navigate(['/login']);
  }
}
