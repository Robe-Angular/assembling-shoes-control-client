import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserNoLoggedGuard implements CanActivate {

  constructor(
    private _router:Router,
    private _userService: UserService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let identity = localStorage.getItem('identity');
    
    let token:string = this._userService.getJwtToken();
    console.log(token);
    if(token == ""){
      
      return true;
    }
    return false;
  }
}
