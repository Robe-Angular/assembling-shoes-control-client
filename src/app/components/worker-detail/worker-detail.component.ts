import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ModelService } from 'src/app/services/model.service';
import { UserService } from 'src/app/services/user.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.scss']
})
export class WorkerDetailComponent implements OnInit {

  public modelsWithOrders: Array<any>;
  public workerId: number;
  public orders: Array<any>;
  public modelsSelectedForOrders:Array<any>;
  public modelsWithSizeWorker: Array<any>;
  public modelsSelectedForSizeWorker: Array<any>;
  public workerName: string;
  public token: string;

  constructor(
    private _route: ActivatedRoute,
    private _modelService: ModelService,
    private _workerService: WorkerService,
    private _userService: UserService
  ) { 
    this.modelsWithOrders = [];
    this.workerId = 0;
    this.orders = [];
    this.modelsSelectedForOrders = [];
    this.modelsWithSizeWorker = [];
    this.modelsSelectedForSizeWorker = [];
    this.workerName = "";
    this.token = this._userService.getJwtToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.workerId = params['workerId'];
      this._modelService.modelsWorkerSatisfyOrder(this.workerId, this.token).subscribe(
        response => {
          this.modelsWithOrders = response.models_boot_satisfy;
          this._modelService.modelsBootByWorker(this.workerId, this.token).subscribe(
            response => {
              this.modelsWithSizeWorker = response.models_boot_satisfy;
              this._workerService.getWorkerInfo(this.workerId, this.token).subscribe(
                response => {
                  this.workerName = response.worker.name;
                }, error => {

                }
              )
            },error => {

            }
          );
        },error => {
          console.log(error);
        }

      )
    });
  }
  getAllOrders(){
    this._modelService.ordersByWorker(this.workerId, this.token).subscribe(
      response => {
        this.orders = response.orders_by_worker;
        this.modelsWithOrders.forEach(
          modelWorkerElement => {
            this.modelsSelectedForOrders.push(modelWorkerElement.id);
          }
        );
        this.sortOrders();
      },error => {
        console.log(error);
      }
    )
  }

  sortOrders(){
    this.orders.sort((a,b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return dateB.getTime() - dateA.getTime();
    })
  }

  concatOrders(modelBootWorkerId:number){
    this._modelService.ordersByModelWorker(modelBootWorkerId, this.token).subscribe(
      response => {
        this.modelsSelectedForOrders.push(modelBootWorkerId);
        this.orders = this.orders.concat(response.orders_by_model_boot_worker);
        this.sortOrders();
      },error => {
        console.log(error);
      }
    );
  }

  filterOrders(modelBootWorkerId:number){
    this.modelsSelectedForOrders = this.modelsSelectedForOrders.filter(
      modelBootWorkerIdElement => modelBootWorkerId !== modelBootWorkerIdElement
    );

    this.orders = this.orders.filter(
      orderElement => orderElement.model_boot_worker_id !== modelBootWorkerId
    );
  }

  checkModelWorker(modelWorkerId:number){
    return this.modelsSelectedForOrders.some(
      modelBootWorkerIdElement => modelBootWorkerIdElement === modelWorkerId
    )
  }

  getTotalInOrder(orderId:number){
    let selectedOrder = this.orders.find(
      orderElement  => orderElement.id === orderId
    );
    
    let totalQuantity = 0;
    selectedOrder.size_order.forEach( (sizeOrderElement:any) => {
      totalQuantity += sizeOrderElement.quantity;
    });
    return totalQuantity;

  }

  getAllSizeWorker(){
    this._modelService.sizeWorkerByWorker(this.workerId, this.token).subscribe(
      response => {
        this.modelsSelectedForSizeWorker = response.models_with_size_worker;
        this.sortAllSizeWorkerSizes();
        
      },error => {
        console.log(error);
      }
    )
  }

  concatSizeWorker(modelBootId:number){
    this._modelService.sizeWorkerByWorkerModel(this.workerId,modelBootId, this.token).subscribe(
      response => {
        let modelWithSizeWorker = response.model_with_size_worker;
        modelWithSizeWorker.sizes.sort((a:any,b:any) => {
          return a.number - b.number;
        });
        this.modelsSelectedForSizeWorker.push(modelWithSizeWorker);
        
      },error => {
        console.log(error);
      }
    )
  }

  sortAllSizeWorkerSizes(){
    this.modelsSelectedForSizeWorker.forEach( (modelBootElement => {
      modelBootElement.sizes.sort((a:any,b:any) => {
        return a.number - b.number;
      });
    }));
  }

  

  filterSizeWorker(modelBootId:number){
    this.modelsSelectedForSizeWorker = this.modelsSelectedForSizeWorker.filter(modelSelected => modelSelected.id !== modelBootId);
  }

  checkModelOnSizeWorker(modelBootId:number){
    return this.modelsSelectedForSizeWorker.some(modelSelected => modelSelected.id === modelBootId);
  }

  getTotalInSizeWorker(modelBootId:number){
    let selectedModelBoot = this.modelsSelectedForSizeWorker.find(
      modelBootElement  => modelBootElement.id === modelBootId
    );
    
    let totalQuantity = 0;
    selectedModelBoot.sizes.forEach( (sizeElement:any) => {
      totalQuantity += sizeElement.size_worker[0].quantity;
    });
    return totalQuantity;

  }
}
