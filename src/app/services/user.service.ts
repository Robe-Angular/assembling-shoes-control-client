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

  public apiUrl:string;

  constructor(
    private _http:HttpClient,
    private _router:Router
    
  ) { 
    this.apiUrl = GLOBAL.apiUrl;
  }

  

  xsrfSanctum(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
		return this._http.get(this.apiUrl+'/sanctum/csrf-cookie',{headers:headers,withCredentials:true});
  }

  getJwtToken():string{
    return localStorage.getItem('token') || "";
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

		return this._http.post(this.apiUrl+'/login', params, {headers: headers});

  }

  register(user:UserRegister){
    let json = JSON.stringify(user);
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    })

		return this._http.post(this.apiUrl+'/register', params, {headers: headers});
  }

  logout(token:string):Observable<any>{
    
		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );
    
    
		return this._http.get(this.apiUrl+'/logout',  {headers: headers});
  }

  getUser(token:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'Authorization', ' Bearer ' + token

    );
		return this._http.get(this.apiUrl+'/user',  {headers: headers});
  }

  updateIdentity(data:any, managerRole:string){
    try{
      let identity: UserIdentity;
      identity = {
        name: data.name,
        email: data.email,
        role: managerRole
      };
      console.log(data);
      localStorage.setItem('identity',JSON.stringify(identity));
    }catch(error){
      console.log(error)
    }
    
  }

  getIdentity(){
    let token = this.getJwtToken();
    if(!token){
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

  verify(token:string):Observable<boolean>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'Authorization', ' Bearer ' + token

    );
		return this._http.get(this.apiUrl+'/verified',  {headers: headers}).pipe(
      map( manager=> {
        const hasCredentials = !!manager.hasOwnProperty('manager');
        
        return hasCredentials;
      } ),
      catchError((err, caught) => {
        console.log(err); 
        localStorage.clear();
        return of(false);
      })
    );
  } 
  
  notPassed(route:string){   
    this._router.navigate([route]);
    return of(false);
  }
  /*
  testing(token:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization', ' Bearer ' + token
        
    );
		return this._http.get(this.apiUrl+'/admin',  {headers: headers});
  }
*/
}
