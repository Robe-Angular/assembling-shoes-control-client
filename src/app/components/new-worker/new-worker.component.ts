import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss']
})
export class NewWorkerComponent implements OnInit {

  public workerName:string;

  constructor(
    private _dialogRef: MatDialogRef <NewWorkerComponent>,
    private _workerService: WorkerService
  ) { 
    this.workerName = "";
  }

  ngOnInit(): void {
  }

  changeWorkerName($event:any){
    this.workerName = $event.target.value;
  }

  submit(){
    this._workerService.createWorker(this.workerName).subscribe(
      response => {
        this._dialogRef.close();
      },error => {
        console.log(error)
      }
    );
  }

  close(){
    this._dialogRef.close();
  }
}
