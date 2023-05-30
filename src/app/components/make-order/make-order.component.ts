//Make-order functions with sizes of model And complete-Order with sizes of worker
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WorkerService } from 'src/app/services/worker.service';
import { ModelService } from 'src/app/services/model.service';
import { MakeOrderSizesComponent } from '../make-order-sizes/make-order-sizes.component';
import { CompleteOrderModelsComponent } from '../complete-order-models/complete-order-models.component';
import { UserService } from 'src/app/services/user.service';

interface DialogDataMakeOrder{
  workerId: number;
  isSubtract: boolean;
}

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {

  public title: string;
  public workerList: Array<any>;
  public modelList: Array<any>
  public workerName: string;
  public modelsSelected:Array<any>;
  public token:string;

  constructor(
    private _userService: UserService,
    private _dialogRef: MatDialogRef<MakeOrderComponent>,
    private _modelService: ModelService,
    private _workerService: WorkerService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataMakeOrder
  ) { 
    this.title = 'Hacer una orden';
    this.workerList = [];
    this.modelList = [];
    this.workerName = "";
    this.modelsSelected = [];
    this.token = this._userService.getJwtToken();
  }

  ngOnInit(): void {
    this.title = this.data.isSubtract ? 'Finalizar una Orden' : 'Hacer una orden';

    if(this.data.workerId == 0){
      this.getWorkerList();
    }else{
      this.getWorkerInfo(this.data.workerId);
      this.getModelList();
    }
    
  }

  getWorkerInfo(workerId:number){
    this._workerService.getWorkerInfo(workerId, this.token).subscribe(
      response => {
        this.workerName = response.worker.name
      },error => {
        console.log(error);
      }
    );
  }

  

  getWorkerList(){
    this._workerService.workerList(this.token).subscribe(
      response => {
        this.workerList = response.workers;
      },error => {
        console.log(error);
      }
    );
  }

  getModelList(){
    this._modelService.modelList(this.token).subscribe(
      response => {
        this.modelList = response.models;
      },error => {
        console.log(error);
      }

    )
  }
  
  selectWorker(id:number, name:string){
    this.data.workerId = id;
    if(this.data.isSubtract){
      this._dialog.open(CompleteOrderModelsComponent,{
        width: '80%',
        maxWidth: '300px',
        restoreFocus: false,
        data:{dialogInfo: this.data, workerName:name}
      });
      this._dialogRef.close();
    }
    this.workerName = name;
    
    this.getModelList();
  }

  selectModel(model:any){
    this.modelsSelected.push(model);
    console.log('actived');
  }

  deselectModel(modelId:number){
    console.log(modelId * 2);
    let removeItem = this.modelsSelected.filter(modelSelected => modelSelected.id !== modelId);
    
    console.log(removeItem);
    this.modelsSelected = removeItem;
  }

  checkOnModelsSelected(modelId:number){
    return this.modelsSelected.some(modelSelected => modelSelected.id === modelId);
  }

  openMakeOrderSizes(){
    this.modelsSelected.sort((a,b) => {
      return a.id - b.id;
    });

    const dialogOpen = this._dialog.open(MakeOrderSizesComponent,{
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data:{modelsSelected:this.modelsSelected, dialogInfo: this.data}
    });
    
    

    this._dialogRef.close();
  }



}
