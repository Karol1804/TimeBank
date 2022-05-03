import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatStepperModule } from '@angular/material/stepper';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServService } from './services/auth-serv.service';
import { GlobalStorageService } from './services/global-storage.service';
import { RegistrationComponent } from './guest/registration/registration.component';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarService } from './services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InterceptorService } from './services/interceptor.service';
import { RatingModule } from 'ng-starrating';
import { UserhomeComponent } from './user/user-layout/userhome/userhome.component';
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
    UserhomeComponent,
    UserServicesComponent,
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
    MatStepperModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    RatingModule
  ],
  providers: [
    ServicesService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuardService,
    SnackBarService,
    AuthServService,
    GlobalStorageService,
    RegistrationComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
