// loader.component.ts
import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: [ './loader.component.scss' ],
})
export class LoaderComponent implements OnInit{

  public isLoading: boolean;

  constructor(
    private loaderService: LoaderService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
        this._changeDetectorRef.detectChanges();    
      },error => {
        console.log('error',error);
      }
    );
    
  }
}


