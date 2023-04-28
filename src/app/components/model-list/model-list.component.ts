import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model.service';


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  public modelList: Array<any>;

  constructor(
    private _dialogRef:MatDialogRef<ModelListComponent>,
    private _modelService: ModelService
  ) { 
    this.modelList = []
  }

  ngOnInit(): void {
    this._modelService.modelList().subscribe(
      response => {
        this.modelList = response.models;
      },error => {
        console.log(error);
      }
    )
  }

}
