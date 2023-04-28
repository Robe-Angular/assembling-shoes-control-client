import { Component, OnInit, AfterViewChecked,ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewWorkerComponent } from '../new-worker/new-worker.component';
import { NewModelComponent } from '../new-model/new-model.component';
import { WorkerListComponent } from '../worker-list/worker-list.component';
import { ModelListComponent } from '../model-list/model-list.component';
import { MakeOrderComponent } from '../make-order/make-order.component';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, AfterViewChecked, OnDestroy {

  constructor(
    private _dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef
  ) { 
    
  }

  ngAfterViewChecked(): void {
    this._changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
  }


  public dialogConfig = {
    width: '80%',
    maxWidth: '300px',
    restoreFocus: false
  }

  newWorkerDialog(){
    const dialogNewWorker = this._dialog.open(NewWorkerComponent, this.dialogConfig);
  }

  workerListDialog(){
    const dialogWorkerList = this._dialog.open(WorkerListComponent, this.dialogConfig);
  }

  newModelDialog(){
    const dialogNewModel = this._dialog.open(NewModelComponent, this.dialogConfig);
  }

  modelListDialog(){
    const modelListDialog = this._dialog.open(ModelListComponent, this.dialogConfig);
  }

  
  newOrderDialog(isSubtract: Boolean){
    const newOrderDialog = this._dialog.open(MakeOrderComponent, {
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data: { workerId: 0, isSubtract:isSubtract}
    })
  }

  ngOnDestroy(): void {
    this._dialog.closeAll();
  }  
}
