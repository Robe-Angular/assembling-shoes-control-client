import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Model } from 'src/app/interfaces/model';
import { ModelService } from 'src/app/services/model.service';


@Component({
  selector: 'app-new-model',
  templateUrl: './new-model.component.html',
  styleUrls: ['./new-model.component.scss']
})
export class NewModelComponent implements OnInit {

  public newModel: Model;

  constructor(
    private _dialogRef: MatDialogRef<NewModelComponent>,
    private _modelService: ModelService
  ) { 
    this.newModel = {
      title: "",
      features: "",
      minSize: 0,
      maxSize: 0
    };
  }

  ngOnInit(): void {

  }

  submitNewModel(){
    this._modelService.createModel(this.newModel).subscribe(
      response => {
        this._dialogRef.close();
      },error => {
        console.log(error);
      }
    )
  }
}
