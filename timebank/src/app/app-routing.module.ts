import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceComponent } from './guest/create-service/create-service.component';
import { GuestLayoutComponent } from './guest/guest-layout/guest-layout.component';
import { OrderComponent } from './guest/order/order.component';
import { ServiceRegisterComponent } from './guest/service-register/service-register.component';

const routes: Routes = [
  {
    path: "", component: GuestLayoutComponent,
  },
  {
    path: "create-service", component: CreateServiceComponent,
  },
  {
    path: "services", component: GuestLayoutComponent,
  },
  {
    path: "service-register", component: ServiceRegisterComponent,
  },
  {
    path: "order/:id", component: OrderComponent,
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
