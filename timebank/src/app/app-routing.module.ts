import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceComponent } from './guest/create-service/create-service.component';
import { GuestLayoutComponent } from './guest/guest-layout/guest-layout.component';
import { OrderComponent } from './guest/order/order.component';
import { ServiceRegisterComponent } from './guest/service-register/service-register.component';
import { RegistrationComponent } from './guest/registration/registration.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserhomeComponent } from './user/user-layout/userhome/userhome.component';
import { UserServicesComponent } from './guest/user-services/user-services.component';
import { MyServicesComponent } from './user/my-services/my-services.component';
import { EditComponent } from './user/my-services/edit/edit.component';

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
    children: [
      {
        path: 'myS',
        component: MyServicesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'myC',
        component: CreateServiceComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'myE',
        component: EditComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'user-service/:user_id',
    component: UserServicesComponent,
  },
  {
    path: 'my-services',
    component: MyServicesComponent,
  },
  {
    path: 'my-services/edit/:id',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
