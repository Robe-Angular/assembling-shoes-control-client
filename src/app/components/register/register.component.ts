import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user-register';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userRegister:UserRegister

  constructor(
    private _userService: UserService
  ) { 
    this.userRegister = {
      name:"",
      email:"",
      password:"",
      passwordRepeat:"",
      admin_email: ""
    }
  }

  ngOnInit(): void {

  }

  submitUserRegister(){
    this._userService.register(this.userRegister).subscribe(
      responseRegister => {
        console.log(responseRegister);
      },error => {
        console.log(error);
      }
    );
  
  

    
  }



}
