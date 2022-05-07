import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginPopComponent } from './login-pop/login-pop.component';
import { LoginBtnComponent } from './login-btn/login-btn.component';
import { LogoutBtnComponent } from './logout-btn/logout-btn.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { PhoComponent } from './pho/pho.component';
import {MatDividerModule} from '@angular/material/divider';
import { MenuBtnComponent } from './menu-btn/menu-btn.component';
import { MatMenuModule } from '@angular/material/menu';
import { RegisPopComponent } from './regis-pop/regis-pop.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    LoginPopComponent,
    LoginBtnComponent,
    LogoutBtnComponent,
    PhoComponent,
    MenuBtnComponent,
    RegisPopComponent,
    
    
    
    
  
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
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatMenuModule,
    MatCheckboxModule
    
  ],
  exports:[RegisPopComponent,PhoComponent,LoginPopComponent,LoginBtnComponent,LogoutBtnComponent,MenuBtnComponent]
})
export class SharedModule { }

