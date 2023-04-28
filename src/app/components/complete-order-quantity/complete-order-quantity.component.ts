import { Component, OnInit,Inject,ViewChild,ElementRef,DoCheck } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model.service';
import { SizeItemwithCurrentQuantity } from '../complete-order-sizes/complete-order-sizes.component';


@Component({
  selector: 'app-complete-order-quantity',
  templateUrl: './complete-order-quantity.component.html',
  styleUrls: ['./complete-order-quantity.component.scss']
})
export class CompleteOrderQuantityComponent implements OnInit {
  @ViewChild ('inputQuantity') inputQuantity!: ElementRef;
  @ViewChild ('dialogTitle') dialogTitle!: ElementRef;
  public sizesSelected:Array<SizeItemwithCurrentQuantity>;
  public lastIndex:number;
  public currentIndex: number;
  private _lastCurrentIndex: number;
  private _secondLastCurrentIndex: number;

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<CompleteOrderQuantityComponent>,
    private _modelService: ModelService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.sizesSelected = data.sizesSelected;
    this.lastIndex = data.sizesSelected.length - 1;
    this.currentIndex = 0;
    this._lastCurrentIndex = 0;
    this._secondLastCurrentIndex = 0;
  }

  ngOnInit(): void {
    this.scrollToDialogTitle();
  }

  ngDoCheck(){
    if(!this.inputQuantity){
      return;
    }
    
    const inputValue = this.inputQuantity.nativeElement.value;
    if(this.currentIndex == 0 && this._lastCurrentIndex == 0 && this._secondLastCurrentIndex == 0){
      this.scrollToDialogTitle();
    }

    if(inputValue == 0){
      this.inputQuantity.nativeElement.select();
      
    }
    /*
    console.log(this.currentIndex, this._lastCurrentIndex);
    console.log(this.currentIndex, this._secondLastCurrentIndex);
    */
   //checking 2nd last because makes two DoChecks by data binding
    if(this.currentIndex != this._secondLastCurrentIndex){
      this.inputQuantity.nativeElement.select();
    }
    this._secondLastCurrentIndex = this._lastCurrentIndex;
    this._lastCurrentIndex = this.currentIndex;
  }

  addIndex(){
    this.currentIndex++;
    
  }
  scrollToDialogTitle(){
    this.dialogTitle.nativeElement.scrollIntoView();
  }
  onInputFocus(){
    this.scrollToDialogTitle();
  }

  subtractIndex(){
    this.currentIndex--;
    
  }

  submitSizes(){
    this._modelService.completeOrder(this.sizesSelected).subscribe(
      response => {
        this._dialogRef.close();
      },error => {

      }
    );

  }

  checkQuantity(){
    let quantityInput = this.sizesSelected[this.currentIndex].quantity
    let currentQuantity = this.sizesSelected[this.currentIndex].currentQuantity
    this.sizesSelected[this.currentIndex].quantity = quantityInput > currentQuantity ?
      currentQuantity : quantityInput;
  }

  fill(){
    this.sizesSelected[this.currentIndex].quantity = this.sizesSelected[this.currentIndex].currentQuantity
  }

}
