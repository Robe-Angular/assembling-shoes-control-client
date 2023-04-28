import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model.service';
import { CompleteOrderSizesComponent } from '../complete-order-sizes/complete-order-sizes.component';

@Component({
  selector: 'app-complete-order-models',
  templateUrl: './complete-order-models.component.html',
  styleUrls: ['./complete-order-models.component.scss']
})
export class CompleteOrderModelsComponent implements OnInit {

  public workerId:number;
  public modelsBoot:Array<any>;
  public workerName:string;
  public modelsSelected:Array<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _dialog:MatDialog,
    private _dialogRef: MatDialogRef<CompleteOrderModelsComponent>,
    private _modelService: ModelService
    
  ) { 
    this.workerId = this.data.dialogInfo.workerId;
    this.workerName = this.data.workerName;
    this.modelsBoot = [];
    this.modelsSelected = [];
  }

  ngOnInit(): void {
    
    this._modelService.modelWorkerSatisfy(this.workerId).subscribe(
      response => {
        this.modelsBoot = response.models_satisfy;
      },error => {
        console.log(error);
      }
    );
  }

  selectModel(modelBoot:any){
    this.modelsSelected.push(modelBoot);
  }

  deselectModel(modelId:number){
    this.modelsSelected = this.modelsSelected.filter( modelSelected => modelSelected.id !== modelId );
  }

  checkOnModelsSelected(modelId:number){
    return this.modelsSelected.some( modelSelected => modelSelected.id === modelId );
  }

  openCompleteOrderSizesDialog(){
    
    this.modelsSelected.sort((a,b) => {
      return a.id - b.id;
    });

    this._dialog.open(CompleteOrderSizesComponent,{
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data:{dialogInfo: this.data, modelsSelected: this.modelsSelected}
    });
    this._dialogRef.close();
  }
}
