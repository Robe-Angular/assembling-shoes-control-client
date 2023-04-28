import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientXsrfModule,HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing,appRoutingProviders } from './app.routing';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { NewModelComponent } from './components/new-model/new-model.component';
import { EditModelComponent } from './components/edit-model/edit-model.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { WorkerListComponent } from './components/worker-list/worker-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { NewWorkerComponent } from './components/new-worker/new-worker.component';
import { ModelListComponent } from './components/model-list/model-list.component';
import { MakeOrderSizesComponent } from './components/make-order-sizes/make-order-sizes.component';
import { MakeOrderQuantityComponent } from './components/make-order-quantity/make-order-quantity.component';
import { CompleteOrderModelsComponent } from './components/complete-order-models/complete-order-models.component';
import { CompleteOrderSizesComponent } from './components/complete-order-sizes/complete-order-sizes.component';
import { CompleteOrderQuantityComponent } from './components/complete-order-quantity/complete-order-quantity.component';
import { WorkerDetailComponent } from './components/worker-detail/worker-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    LoginComponent,
    RegisterComponent,
    UserPanelComponent,
    NewModelComponent,
    EditModelComponent,
    MakeOrderComponent,
    WorkerListComponent,
    LoaderComponent,
    NewWorkerComponent,
    ModelListComponent,
    MakeOrderSizesComponent,
    MakeOrderQuantityComponent,
    CompleteOrderModelsComponent,
    CompleteOrderSizesComponent,
    CompleteOrderQuantityComponent,
    WorkerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName:'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    routing,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
   },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
