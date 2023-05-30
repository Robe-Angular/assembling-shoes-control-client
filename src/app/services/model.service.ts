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

  private apiUrl:string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { 
    this.apiUrl = GLOBAL.apiUrl;
  }

  createModel(model:Model, token:string):Observable<any>{
    let json = JSON.stringify(model);
		let params = 'json='+json;

		const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.post(this.apiUrl+'/make-model', params, {headers: headers});
  }

  modelList(token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/model-list', {headers: headers});
  }

  getModelInfo(modelId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/get-model/' + modelId, {headers: headers});
  }

  getSizes(modelId:number, token: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/get-sizes-by-model-boot/' + modelId, {headers: headers});
  }

  makeOrder(sizesSelected:Array<any>,workerId:number, token:string):Observable<any>{
    let json = JSON.stringify(sizesSelected);
		let params = 'json='+json;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.post(this.apiUrl+'/make-order/' + workerId,params, {headers: headers});
  }

  modelWorkerSatisfy(workerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/model-worker-satisfy/' + workerId, {headers: headers});
  }

  sizeWorkerSatisfy(modelId:number, workerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/size-worker-satisfy/' + workerId + '/' + modelId, {headers: headers});
  }

  completeOrder(sizesSelected:Array<any>, token: string):Observable<any>{
    let json = JSON.stringify(sizesSelected);
		let params = 'json='+json;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.post(this.apiUrl+'/complete-order',params, {headers: headers});
  }


  modelsWorkerSatisfyOrder(workerId:number, token: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/models-worker-satisfy-order/' + workerId , {headers: headers});
  }

  ordersByWorker(workerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/orders-by-worker/' + workerId , {headers: headers});
  }

  ordersByModelWorker(modelBootWorkerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/orders-by-model-boot-worker/' + modelBootWorkerId , {headers: headers});
  }

  modelsBootByWorker(workerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/models-boot-satisfy-worker/' + workerId , {headers: headers});
  }

  sizeWorkerByWorker(workerId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/size-worker-satisfy-worker/' + workerId , {headers: headers});
  }

  sizeWorkerByWorkerModel(workerId:number, modelBootId:number, token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    }).set(
      'Authorization', ' Bearer ' + token
    );

		return this._http.get(this.apiUrl+'/size-worker-satisfy-worker-model/' + workerId + '/' + modelBootId , {headers: headers});
  }
  
}
