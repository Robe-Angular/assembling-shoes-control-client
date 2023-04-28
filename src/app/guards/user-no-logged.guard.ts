import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserNoLoggedGuard implements CanActivate {

  constructor(
    private _router:Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let identity = localStorage.getItem('identity');
    console.log(identity);
    if(identity != undefined){
      this._router.navigate(['/admin-panel']);
      return false;
    }else{
      return true;
    }
    
  }
  
}
