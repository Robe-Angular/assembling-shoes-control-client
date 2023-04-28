import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient} from '@angular/common/http';

import { of,map,catchError, Observable, ObservableInput } from 'rxjs';
import { GLOBAL } from '../constants';
import { UserLogin } from '../interfaces/user-login';
import { UserRegister } from '../interfaces/user-register';
import { UserIdentity } from '../interfaces/user-identity';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})

export class UserService {

  public webUrl:string;

  constructor(
    private _http:HttpClient,
    private _router:Router
    
  ) { 
    this.webUrl = GLOBAL.webUrl;
  }

  

  xsrfSanctum(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
		return this._http.get(this.webUrl+'/sanctum/csrf-cookie',{headers:headers,withCredentials:true});
  }

  
  
  getXsrfToken():string {
    try{
      const cookieValue = document.cookie.split('=')[1]
      .split(';')[0];
      //const cookieValue = document.cookie;
      return cookieValue;
    }catch{
      return 'false';
    }
    
    
  }

  login(user:UserLogin):Observable<any>{
    let json = JSON.stringify(user);
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this.getXsrfToken())
    );

		return this._http.post(this.webUrl+'/login', params, {headers: headers,withCredentials:true});

  }

  register(user:UserRegister){
    let json = JSON.stringify(user);
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this.getXsrfToken())
    );

		return this._http.post(this.webUrl+'/register', params, {headers: headers,withCredentials:true});
  }

  logout():Observable<any>{
    
		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this.getXsrfToken()) 
    );
		return this._http.get(this.webUrl+'/logout',  {headers: headers,withCredentials:true});
  }

  getUser():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'X-XSRF-TOKEN', decodeURIComponent(this.getXsrfToken())

    );
		return this._http.get(this.webUrl+'/user',  {headers: headers,withCredentials:true});
  }

  updateIdentity(data:any, managerRole:string){
    let identity: UserIdentity;
    identity = {
      name: data.name,
      email: data.email,
      role: managerRole
    };
    console.log(data);
    localStorage.setItem('identity',JSON.stringify(data));
  }

  getIdentity(){
    let cookie = this.getXsrfToken();
    if(cookie == 'false'){
      let identity = {
        name: "",
        email: "",
        role: ""
      };
      localStorage.removeItem('identity');
      return identity;
    }
    return JSON.parse(localStorage.getItem('identity') || "{}");
  }

  verify():Observable<boolean>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'X-XSRF-TOKEN', decodeURIComponent(this.getXsrfToken())

    );
		return this._http.get(this.webUrl+'/verified',  {headers: headers,withCredentials:true}).pipe(
      map( manager=> {
        const hasCredentials = !!manager.hasOwnProperty('manager');
        console.log(manager);
        return hasCredentials;
      } ),
      catchError((err, caught) => {
        return this.notPassed('/login');
      })
    );
  } 
  
  notPassed(route:string){   
    this._router.navigate([route]);
    return of(false);
  }


}
