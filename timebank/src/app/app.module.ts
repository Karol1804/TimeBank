import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestLayoutComponent } from './guest/guest-layout/guest-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ServicesService } from './services/services.service';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from './nav/nav.component';
import { MatCardModule } from '@angular/material/card';
import { OrderComponent } from './guest/order/order.component';
import { ServiceRegisterComponent } from './guest/service-register/service-register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CreateServiceComponent } from './guest/create-service/create-service.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { SharedModule } from './shared/shared.module';


import {MatStepperModule} from '@angular/material/stepper';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServService } from './services/auth-serv.service';
import { GlobalStorageService } from './services/global-storage.service';
import { RegistrationComponent } from './guest/registration/registration.component';
import { UserServicesComponent } from './guest/user-services/user-services.component';



@NgModule({
  declarations: [
    AppComponent,
    GuestLayoutComponent,
    NavComponent,
    OrderComponent,
    ServiceRegisterComponent,
    CreateServiceComponent,
    RegistrationComponent,
    UserServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatSidenavModule, 
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    SharedModule,
    MatStepperModule
   

  ],
  providers: [ServicesService, {provide: LocationStrategy, useClass: HashLocationStrategy}, 
              AuthGuardService, AuthServService, GlobalStorageService, RegistrationComponent
  
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
