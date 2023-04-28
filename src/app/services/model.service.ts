import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../constants';
import { UserService } from './user.service';
import { Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private webUrl:string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { 
    this.webUrl = GLOBAL.webUrl;
  }

  createModel(model:Model):Observable<any>{
    let json = JSON.stringify(model);
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.post(this.webUrl+'/make-model', params, {headers: headers,withCredentials:true});
  }

  modelList():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/model-list', {headers: headers,withCredentials:true});
  }

  getModelInfo(modelId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/get-model/' + modelId, {headers: headers,withCredentials:true});
  }

  getSizes(modelId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/get-sizes-by-model-boot/' + modelId, {headers: headers,withCredentials:true});
  }

  makeOrder(sizesSelected:Array<any>,workerId:number):Observable<any>{
    let json = JSON.stringify(sizesSelected);
		let params = 'json='+json;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.post(this.webUrl+'/make-order/' + workerId,params, {headers: headers,withCredentials:true});
  }

  modelWorkerSatisfy(workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/model-worker-satisfy/' + workerId, {headers: headers,withCredentials:true});
  }

  sizeWorkerSatisfy(modelId:number, workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/size-worker-satisfy/' + workerId + '/' + modelId, {headers: headers,withCredentials:true});
  }

  completeOrder(sizesSelected:Array<any>):Observable<any>{
    let json = JSON.stringify(sizesSelected);
		let params = 'json='+json;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.post(this.webUrl+'/complete-order',params, {headers: headers,withCredentials:true});
  }


  modelsWorkerSatisfyOrder(workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/models-worker-satisfy-order/' + workerId , {headers: headers,withCredentials:true});
  }

  ordersByWorker(workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/orders-by-worker/' + workerId , {headers: headers,withCredentials:true});
  }

  ordersByModelWorker(modelBootWorkerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/orders-by-model-boot-worker/' + modelBootWorkerId , {headers: headers,withCredentials:true});
  }

  modelsBootByWorker(workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/models-boot-satisfy-worker/' + workerId , {headers: headers,withCredentials:true});
  }

  sizeWorkerByWorker(workerId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/size-worker-satisfy-worker/' + workerId , {headers: headers,withCredentials:true});
  }

  sizeWorkerByWorkerModel(workerId:number, modelBootId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'X-XSRF-TOKEN', decodeURIComponent(this._userService.getXsrfToken())
    );

		return this._http.get(this.webUrl+'/size-worker-satisfy-worker-model/' + workerId + '/' + modelBootId , {headers: headers,withCredentials:true});
  }
  
}
