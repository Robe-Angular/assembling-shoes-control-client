import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  showLoaderCustom: any[] = [];
constructor(private loaderService: LoaderService) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    this.loaderService.show();
    this.showLoaderCustom.push(request);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            this.showLoaderCustom.pop();
            if(this.showLoaderCustom.length == 0){
                this.loaderService.hide();
            }
        }
    },
        (err: any) => {
            this.showLoaderCustom.pop();
            if(this.showLoaderCustom.length == 0){
                this.loaderService.hide();
            }
        }));
}   
}
