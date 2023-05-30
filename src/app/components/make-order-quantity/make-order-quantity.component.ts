import { Component, OnInit, Inject,ViewChild,ElementRef, DoCheck } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { SizeItem } from '../make-order-sizes/make-order-sizes.component'; 
import { ModelService } from 'src/app/services/model.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-make-order-quantity',
  templateUrl: './make-order-quantity.component.html',
  styleUrls: ['./make-order-quantity.component.scss']
})
export class MakeOrderQuantityComponent implements OnInit,DoCheck {

  

  public sizeItems: Array<SizeItem>;
  public currentIndex: number;
  public lastIndex: number;
  public orderInfo: any;
  private _lastCurrentIndex: number;
  private _secondLastCurrentIndex:number;
  public token:string;

  @ViewChild('inputQuantity') inputQuantity!: ElementRef;
  @ViewChild ('dialogTitle') dialogTitle!: ElementRef;

  constructor(
    private _dialogRef: MatDialogRef<MakeOrderQuantityComponent>,
    private _modelService: ModelService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.sizeItems = this.data.sizesSelected;
    this.currentIndex = 0;
    this.lastIndex = 0;
    this.orderInfo = this.data.dialogInfo;
    this._lastCurrentIndex = 0;
    this._secondLastCurrentIndex = 0;
    this.token = this._userService.getJwtToken();
  }

  ngDoCheck(): void {
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

  scrollToDialogTitle(){
    this.dialogTitle.nativeElement.scrollIntoView();
  }
  
  onInputFocus(){
    this.scrollToDialogTitle();
  }
  
  ngOnInit(): void {
    this.lastIndex = this.sizeItems.length - 1;
  }

  addIndex(){
    this.currentIndex++;
  }

  subtractIndex(){
    this.currentIndex--;    
  }

  

  submitArray(){
    this._modelService.makeOrder(this.sizeItems,this.orderInfo.workerId, this.token).subscribe(
      response => {
        this._dialogRef.close();
      },error => {
        console.log(error);
      }
    )
  }
}

