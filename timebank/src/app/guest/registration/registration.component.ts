import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MyTel } from 'src/app/shared/pho/MyTel';
import { AuthServService } from 'src/app/services/auth-serv.service';
import { RegisUser } from 'src/app/models/RegisUser';
import { RegisUserResp } from 'src/app/models/RegisUserResp';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import ValidService from 'src/app/services/valid.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  valuePhone: string;

  user_regForm: RegisUser = {
    user_name: '',
    phone: '',
    password: '',
    password_val: '',
  };

  user_registred: RegisUserResp;

  phone: FormGroup = new FormGroup({
    myphone: new FormControl(new MyTel('+', '', '', '')),
  });

  onFormSubmit(): void {
    this.valuePhone =
      '+' +
      this.phone.get('myphone')?.value.area +
      ' ' +
      this.phone.get('myphone')?.value.exchange +
      ' ' +
      this.phone.get('myphone')?.value.subscriber;
  }



  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
    thirdCtrl_val: ['', Validators.required],
  });

  
   
  



  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    public breakpointObserver: BreakpointObserver,
    public router: Router,
    public authservice: AuthServService,
    public guard: AuthGuardService,
    public passvalid: ValidService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1200px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }






  sendRegist(): RegisUserResp {
    this.onFormSubmit();

    this.user_regForm = {
      phone: this.valuePhone,
      user_name: this.firstFormGroup.get('firstCtrl')?.value,
      password: this.thirdFormGroup.get('thirdCtrl')?.value,
      password_val: this.thirdFormGroup.get('thirdCtrl_val')?.value,
    };

   
    this.authservice.registrationUser(this.user_regForm).subscribe((data) => {
      this.user_registred = data;
    });
   
    this.authservice.popOpenDialog();

    return this.user_registred;
  }
}
