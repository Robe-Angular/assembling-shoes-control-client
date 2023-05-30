import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  public modelList: Array<any>;
  public token:string;

  constructor(
    private _dialogRef:MatDialogRef<ModelListComponent>,
    private _modelService: ModelService,
    private _userService: UserService

  ) { 
    this.modelList = []
    this.token = this._userService.getJwtToken()
  }

  ngOnInit(): void {
    this._modelService.modelList(this.token).subscribe(
      response => {
        this.modelList = response.models;
      },error => {
        console.log(error);
      }
    )
  }

}
