import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient} from '@angular/common/http';
import { UserService } from './user.service';
import { GLOBAL } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  
  private apiUrl:string;

  constructor(
    private _http:HttpClient,
    private _userService: UserService
  ) { 
    this.apiUrl = GLOBAL.apiUrl;
  }

  createWorker(name:string, token:string):Observable<any>{
    let json = JSON.stringify({
      name: name
    });
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.post(this.apiUrl+'/new-worker', params, {headers: headers});
  }

  workerList(token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/worker-list', {headers: headers});
  }

  getWorkerInfo(workerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/get-worker/' + workerId, {headers: headers});
  }

}
