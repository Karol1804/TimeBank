import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceComponent } from './guest/create-service/create-service.component';
import { GuestLayoutComponent } from './guest/guest-layout/guest-layout.component';
import { OrderComponent } from './guest/order/order.component';
import { ServiceRegisterComponent } from './guest/service-register/service-register.component';
import { RegistrationComponent } from './guest/registration/registration.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserhomeComponent } from './user/user-layout/userhome/userhome.component';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
  },
  {
    path: 'create-service',
    component: CreateServiceComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'services',
    component: GuestLayoutComponent,
  },
  {
    path: 'service-register',
    component: ServiceRegisterComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'order/:id',
    component: OrderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'userhome',
    component: UserhomeComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
