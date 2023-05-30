import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  public token:string
  constructor(
    private _adminService: AdminService,
    private _userService: UserService

  ){
    this.token = this._userService.getJwtToken();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = this._userService.getJwtToken();
      return this._adminService.verify(this.token);
  }
  
}
