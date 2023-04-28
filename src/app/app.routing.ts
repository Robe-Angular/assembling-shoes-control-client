import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { WorkerDetailComponent } from './components/worker-detail/worker-detail.component';
/*
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { NewModelComponent } from './components/new-model/new-model.component';
import { NewWorkerComponent } from './components/new-worker/new-worker.component';
import { WorkerListComponent } from './components/worker-list/worker-list.component';
*/

import { UserLoggedGuard } from './guards/user-logged.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { UserNoLoggedGuard } from './guards/user-no-logged.guard';

const appRoutes: Routes = [
    {path:'', component: LoginComponent, canActivate:[UserNoLoggedGuard]},
    {path:'login', component: LoginComponent, canActivate:[UserNoLoggedGuard]},
    {path:'register', component: RegisterComponent, canActivate:[UserNoLoggedGuard]},
    {path:'admin-panel', component: AdminPanelComponent, canActivate:[IsAdminGuard]},
    {path:'user-panel', component: UserPanelComponent, canActivate:[UserLoggedGuard]},
    {path:'worker-detail/:workerId', component: WorkerDetailComponent, canActivate:[UserLoggedGuard]}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);