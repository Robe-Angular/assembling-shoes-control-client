import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model.service';
import { MakeOrderQuantityComponent } from '../make-order-quantity/make-order-quantity.component';

export interface SizeItem{
  modelId: number;
  modelTitle: string;
  modelFeatures: string;
  sizeId: number;
  number: number;
  quantity: number;
}

@Component({
  selector: 'app-make-order-sizes',
  templateUrl: './make-order-sizes.component.html',
  styleUrls: ['./make-order-sizes.component.scss']
})
export class MakeOrderSizesComponent implements OnInit {

  public lastIndex: number;
  public currentSizes: Array<any>;
  public currentIndex: number;
  public currentIndexModelId: number;
  public modelsSelected: Array<any>;
  public sizesSelected: Array<SizeItem>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _model_boot_service: ModelService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<MakeOrderSizesComponent>
  ) { 
    this.lastIndex = data.modelsSelected.length - 1;
    this.currentIndex = 0;
    this.currentSizes = [];
    this.currentIndexModelId = 0;
    this.modelsSelected = data.modelsSelected;
    this.sizesSelected = [];
  }

  ngOnInit(): void {
    this.getCurrentModelInfoSizes();
  }

  

  subtractIndex(){
    this.currentIndex--;
    this.getCurrentModelInfoSizes();
  }

  addIndex(){
    this.currentIndex++;
    this.getCurrentModelInfoSizes();
  }

  getCurrentModelInfoSizes(){
    this.changeModelIdFromIndex();
    this.getSizesFromModel(this.currentIndexModelId);
  }

  changeModelIdFromIndex(){
    this.currentIndexModelId = this.data.modelsSelected[this.currentIndex].id;
  }

  getSizesFromModel(modelId:number){
    this._model_boot_service.getSizes(modelId).subscribe(
      response => {
        this.currentSizes = response.sizes.sort((a:any,b:any) => {
          return a.number - b.number;
        });
        
      }
    )
  }

  openQuantityDialog(){

    this.sizesSelected.sort((a,b) => {
      if(a.modelId !== b.modelId){
        return a.modelId - b.modelId;
      }
      return a.number - b.number;
    });
    
    const dialogmakeOrderQuantity = this._dialog.open( MakeOrderQuantityComponent,{
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data:{sizesSelected:this.sizesSelected, dialogInfo: this.data.dialogInfo}
    })

    this._dialogRef.close();
  }

  checkIsSize(sizeId:number){
    return this.sizesSelected.some(sizeElement => sizeElement.sizeId === sizeId);
  }

  selectSize(sizeId:number, sizeNumber:number){
    let newSize:SizeItem = {
      sizeId: sizeId,
      modelId: this.currentIndexModelId,
      number: sizeNumber,
      quantity: 0,
      modelTitle: this.modelsSelected[this.currentIndex].title,
      modelFeatures: this.modelsSelected[this.currentIndex].features
    }
    this.sizesSelected.push(newSize);
    
  }

  deselectSize(sizeId:number){
    this.sizesSelected = this.sizesSelected.filter( sizeElement => sizeElement.sizeId !== sizeId );
    
  }
  
}
