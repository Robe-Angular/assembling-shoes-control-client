import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient, } from '@angular/common/http';
import { of,map,catchError, Observable } from 'rxjs';

import { GLOBAL } from '../constants';
import { UserService } from './user.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //public apiUrl:string;
  public apiUrl:string;

  constructor(
    private _http:HttpClient,
    private _userService:UserService,
    private _router:Router
  ) { 
    this.apiUrl = GLOBAL.apiUrl;
  }

  getAdmin(token:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization', ' Bearer ' + token
        
    );
		return this._http.get(this.apiUrl+'/admin',  {headers: headers});
  }

  verify(token:string):Observable<boolean>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'Authorization', ' Bearer ' + token

    );
		return this._http.get(this.apiUrl+'/admin',  {headers: headers}).pipe(
      map( manager=> {
        const hasCredentials = !!manager.hasOwnProperty('manager');
        
        console.log(manager);
        return hasCredentials;
      } ),
      catchError((error, caught) => {
        return this._userService.notPassed('/user-panel');
      })
    );
  }

  allow_register(allowRegister:boolean,token:string):Observable<any>{

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization', ' Bearer ' + token
        
    );

		return this._http.get(this.apiUrl+'/admin/allow_register'+'/'+ allowRegister, {headers: headers});
  }

  getUsersNotVerified(token:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization', ' Bearer ' + token
        
    );

		return this._http.get(this.apiUrl+'/admin/users-not-verified', {headers: headers});
  }

  accept(userId:number,token:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization', ' Bearer ' + token
        
    );

		return this._http.get(this.apiUrl+'/admin/accept-email/' + userId, {headers: headers});
  }

  deny(userId:number, token:string):Observable<any>{ 
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization', ' Bearer ' + token
        
    );

		return this._http.get(this.apiUrl+'/admin/deny-email/' + userId, {headers: headers});
  }
}
