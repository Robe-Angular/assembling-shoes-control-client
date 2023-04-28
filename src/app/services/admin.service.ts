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

  public webUrl:string;

  constructor(
    private _http:HttpClient,
    private _userService:UserService,
    private _router:Router
  ) { 
    this.webUrl = GLOBAL.webUrl;
  }

  getAdmin():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
        
    );
		return this._http.get(this.webUrl+'/admin',  {headers: headers,withCredentials:true});
  }

  verify():Observable<boolean>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())

    );
		return this._http.get(this.webUrl+'/admin',  {headers: headers,withCredentials:true}).pipe(
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

  allow_register(allowRegister:boolean):Observable<any>{

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
        
    );

		return this._http.get(this.webUrl+'/admin/allow_register'+'/'+ allowRegister, {headers: headers,withCredentials:true});
  }

  getUsersNotVerified():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
        
    );

		return this._http.get(this.webUrl+'/admin/users-not-verified', {headers: headers,withCredentials:true});
  }

  accept(userId:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
        
    );

		return this._http.get(this.webUrl+'/admin/accept-email/' + userId, {headers: headers,withCredentials:true});
  }

  deny(userId:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
        
    );

		return this._http.get(this.webUrl+'/admin/deny-email/' + userId, {headers: headers,withCredentials:true});
  }
}
