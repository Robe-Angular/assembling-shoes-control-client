import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient} from '@angular/common/http';
import { UserService } from './user.service';
import { GLOBAL } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  
  private webUrl:string;

  constructor(
    private _http:HttpClient,
    private _userService: UserService
  ) { 
    this.webUrl = GLOBAL.webUrl;
  }

  createWorker(name:string):Observable<any>{
    let json = JSON.stringify({
      name: name
    });
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.post(this.webUrl+'/new-worker', params, {headers: headers,withCredentials:true});
  }

  workerList():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/worker-list', {headers: headers,withCredentials:true});
  }

  getWorkerInfo(workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/get-worker/' + workerId, {headers: headers,withCredentials:true});
  }

}
