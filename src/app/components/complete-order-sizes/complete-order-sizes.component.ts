//Make-order functions with sizes of model And complete-Order with sizes of worker

import { Component, OnInit,Inject } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SizeItem } from '../make-order-sizes/make-order-sizes.component';
import { CompleteOrderQuantityComponent } from '../complete-order-quantity/complete-order-quantity.component';
import { ViewChild } from '@angular/core';

export interface SizeItemwithCurrentQuantity extends SizeItem{
  currentQuantity:number;
}

@Component({
  selector: 'app-complete-order-sizes',
  templateUrl: './complete-order-sizes.component.html',
  styleUrls: ['./complete-order-sizes.component.scss']
})
export class CompleteOrderSizesComponent implements OnInit {

  public modelsSelected:Array<any>;
  public workerId:number;
  public currentIndex: number;
  public currentSizes:Array<any>;
  public sizesSelected: Array<SizeItemwithCurrentQuantity>;
  public lastIndex:number;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _dialogRef: MatDialogRef<CompleteOrderSizesComponent>,
    private _dialog: MatDialog,
    private _modelService: ModelService
  ) { 
    this.workerId = this.data.dialogInfo.dialogInfo.workerId;
    this.modelsSelected = this.data.modelsSelected;
    this.currentIndex = 0;
    this.lastIndex = this.modelsSelected.length - 1;
    this.sizesSelected = [];
    this.currentSizes = [];
  }

  ngOnInit(): void {
    this.getSizesWorkerFromModel();
  }

  

  getSizesWorkerFromModel(){
    let modelId = this.modelsSelected[this.currentIndex].id
    this._modelService.sizeWorkerSatisfy(modelId, this.workerId).subscribe( 
      response =>{

        this.currentSizes = response.sizes_worker_satisfy.sort((a:any,b:any) => {
          return a.size.number - b.size.number;
        })
        console.log(this.currentSizes)
      }, error => {
        console.log(error);
      }
    )
  }

  addIndex(){
    this.currentIndex++;
    this.getSizesWorkerFromModel();
  }

  subtractIndex(){
    this.currentIndex--;
    this.getSizesWorkerFromModel();
  }

  openCompleteOrderQuantityDialog(){
    this.sizesSelected.sort((a,b) => {

      if(a.modelId !== b.modelId){
        return a.modelId - b.modelId;
      }
      return a.number - b.number;
      
    });

    this._dialog.open(CompleteOrderQuantityComponent,{
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data:{sizesSelected:this.sizesSelected, dialogInfo: this.data.dialogInfo.dialogInfo}
    });

    console.log(this.sizesSelected);

    this._dialogRef.close();
  }

  selectSize(sizeSelected:any){
    let newSize:SizeItemwithCurrentQuantity ={
      modelId: this.modelsSelected[this.currentIndex].id,
      modelTitle: this.modelsSelected[this.currentIndex].title,
      modelFeatures: this.modelsSelected[this.currentIndex].features,
      sizeId: sizeSelected.id,
      number: sizeSelected.size.number,
      quantity: 0,
      currentQuantity: sizeSelected.quantity
    }

    this.sizesSelected.push(newSize);
  }

  deselectSize(sizeId:number){
    this.sizesSelected = this.sizesSelected.filter(sizeElement => sizeElement.sizeId != sizeId);    
  }

  checkOnSizesSelected(sizeId:number){
    return this.sizesSelected.some(sizeElement => sizeElement.sizeId == sizeId);
  }

}
