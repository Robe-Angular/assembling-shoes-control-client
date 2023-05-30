import { Component,DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { UserIdentity } from './interfaces/user-identity';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  public identity: UserIdentity;
  public token:string;
  constructor(
    private _userService: UserService,
    private _router:Router
  ){
    this.identity = {
      name: "",
      email: "",
      role: ""
    };
    this.token = this._userService.getJwtToken();

  }
  title = 'assembling-shoes-control-client';

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getJwtToken();
  }

  isAdmin(){
    return "allow_register" in this.identity;
  }

  isUser(){
    return  !("allow_register" in this.identity) && this.identity.name !== "";
  }

  logout(){
    this._userService.logout(this.token).subscribe(
      response => {
        if(response){
          localStorage.clear();
          this.identity = this._userService.getIdentity();
          this._router.navigate(['/login']);
        }
        
      }, error => {
        console.log(error);
      }
    );
  }

  verify(){
    this._userService.verify(this.token).subscribe(
      response =>{
        
      },error => {
        
      }
      
    );
  }
  /*
  testing(){
    this._userService.testing(this.token).subscribe(
      
    );
  }
  */
}
