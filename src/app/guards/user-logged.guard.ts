import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {

  public token:string;
  constructor(
    private _router: Router,
    private _userService: UserService
  ){
    this.token = this._userService.getJwtToken();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = this._userService.getJwtToken();
      return this._userService.verify(this.token);
  }
  
}
