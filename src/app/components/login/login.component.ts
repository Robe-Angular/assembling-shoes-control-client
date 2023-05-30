import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { UserLogin } from 'src/app/interfaces/user-login';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLogin:UserLogin;
  public token: string;

  constructor(
    private _userService: UserService,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.userLogin = {
      email: "",
      password: ""
    };
    this.token = "";
  }

  ngOnInit(): void {

  }

  

  submitUserLogin(){

      this._userService.login(this.userLogin).subscribe(

        responseLogin => {
          this.token = responseLogin.token;
          localStorage.setItem('token',responseLogin.token);
          if(responseLogin.user_role == 'user'){

            this._userService.getUser(responseLogin.token).subscribe(
              responseGetUser => {
                this._userService.updateIdentity(responseGetUser.manager,'user');
                this._router.navigate(['/user-panel']);

              },error => {
                console.log(error);
              }

            );
            }else{ 
            this._adminService.getAdmin(responseLogin.token).subscribe(
              responseGetAdmin => {
                this._userService.updateIdentity(responseGetAdmin.manager,'admin');
                this._router.navigate(['/admin-panel']);
              },error => {
                console.log(error);
              }
            );
          }
                      
        },
        error => {
          console.log(error);
        }
      );   
  }
}
