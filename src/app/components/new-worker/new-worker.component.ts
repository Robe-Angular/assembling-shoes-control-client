import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { WorkerService } from 'src/app/services/worker.service';


@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss']
})
export class NewWorkerComponent implements OnInit {

  public workerName:string;
  public token:string;

  constructor(
    private _dialogRef: MatDialogRef <NewWorkerComponent>,
    private _workerService: WorkerService,
    private _userService: UserService
  ) { 
    this.workerName = "";
    this.token = this._userService.getJwtToken();
  }

  ngOnInit(): void {
  }

  changeWorkerName($event:any){
    this.workerName = $event.target.value;
  }

  submit(){
    this._workerService.createWorker(this.workerName, this.token).subscribe(
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
