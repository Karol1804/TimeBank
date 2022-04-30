import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { MyTel } from 'src/app/shared/pho/MyTel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {

  valuePhone: string;

 phone: FormGroup = new FormGroup({
    myphone: new FormControl(new MyTel('+','', '', '')),
   });

  onFormSubmit(): void {
    this.valuePhone=this.phone.get('myphone')?.value.plus
    +' '+ this.phone.get('myphone')?.value.area 
    +' '+ this.phone.get('myphone')?.value.exchange
    +' '+ this.phone.get('myphone')?.value.subscriber;
} 


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>; 
 

  constructor(private _formBuilder: FormBuilder,
     breakpointObserver: BreakpointObserver,
     router: Router , )
      {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1200px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      
 
      }
    
    
    
    }
