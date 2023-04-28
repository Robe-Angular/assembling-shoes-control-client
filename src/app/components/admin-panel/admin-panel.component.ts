import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/interfaces/admin';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  
  public admin:Admin;
  public usersNotVerified:Array<User>;

  constructor(
    private _adminService: AdminService
  ) { 
    this.admin = {
      name:"",
      email: "",
      allow_register: 0
    },
    this.usersNotVerified = [];
  }

  updateAdmin(){
    this._adminService.getAdmin().subscribe(
      response => {
        this.admin = response.manager;
        this._adminService.getUsersNotVerified().subscribe(
          response => {
            this.usersNotVerified = response.users_not_verified;
            console.log(response);
          },error => {
            console.log(error);
          }
        );

      },error => {
        console.log(error)
      }
  
    )
  }

  ngOnInit(): void {
    this.updateAdmin();
  }

  allowRegister(allowRegister:boolean){
    this._adminService.allow_register(allowRegister).subscribe(
      response => {
        this.updateAdmin();
      },error => {
        console.log(error);
      }
    );
  }

  accept(userId:number){
    this._adminService.accept(userId).subscribe(
      response => {
        this.updateAdmin();
        console.log(response);
      },error => {
        console.log(error);
      }
    );
  }

  deny(userId:number){
    this._adminService.deny(userId).subscribe(
      response => {
        this.updateAdmin();
        console.log(response);
      },error => {
        console.log(error);
      }
    );
  }
  
}
