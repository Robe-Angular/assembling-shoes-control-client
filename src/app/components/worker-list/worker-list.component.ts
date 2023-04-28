import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { WorkerService } from 'src/app/services/worker.service';



@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit{

  public workerList: Array<any>;

  constructor(
    private _dialogRef: MatDialogRef<WorkerListComponent>,
    private _workerService: WorkerService
  ) { 
    
    this.workerList = [];
  }

  ngOnInit(): void {
    
    this._workerService.workerList().subscribe(
      response => {
        this.workerList = response.workers;
        
      },error => {
        console.log(error);
      }
    ); 
  }

  close(){
    this._dialogRef.close();
  }

}
