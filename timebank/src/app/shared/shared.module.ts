import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginPopComponent } from './login-pop/login-pop.component';
import { LoginBtnComponent } from './login-btn/login-btn.component';
import { LogoutBtnComponent } from './logout-btn/logout-btn.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    LoginPopComponent,
    LoginBtnComponent,
    LogoutBtnComponent
  ],
imports: [
    CommonModule,
    SharedRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
    
  ],
  exports:[LoginPopComponent,LoginBtnComponent,LogoutBtnComponent]
})
export class SharedModule { }

