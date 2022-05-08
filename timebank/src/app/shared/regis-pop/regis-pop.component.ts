import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthServService } from 'src/app/services/auth-serv.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { MyTel } from '../pho/MyTel';
import ValidService from 'src/app/services/valid.service';
import CheckPhoneService from 'src/app/services/check-phone.service';
import { UserRespond } from 'src/app/models/UserRespond';
import { RegisUserResp } from 'src/app/models/RegisUserResp';

@Component({
  selector: 'app-regis-pop',
  templateUrl: './regis-pop.component.html',
  styleUrls: ['./regis-pop.component.css'],
})
export class RegisPopComponent implements OnInit, OnDestroy {
  phoneSendResp: { result: boolean };
  public phoneJoin: string;
  formGroup: FormGroup;
  //titleAlert: string = 'This field is required';
  post: any = '';
  user_registred: RegisUserResp;
  hide: boolean = true;
  hide2: boolean = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthServService,
    public snack: SnackBarService,
    public checkphone: CheckPhoneService,
    private router: Router,
    private dialogRef: MatDialogRef<RegisPopComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private validpass: ValidService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {}

  createForm() {
    /*let regex: RegExp = /^$/ */

    this.formGroup = new FormGroup(
      {
        name: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(3),
          ],
        }),

        myphone: new FormControl(new MyTel('+', '421', '', ''), {
          validators: [Validators.required, this.checkPhoneVal],
          asyncValidators: CheckPhoneService.createValidator(this.userService),
        }),

        password: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(5),
          ],
        }),
        password_valid: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(5),
          ],
        }),
      },
      ValidService.match('password', 'password_valid')
    );
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get myphone() {
    return this.formGroup.get('myphone') as FormControl;
  }

  getErrorName() {
    return this.formGroup.get('name')?.hasError('required')
      ? 'The field is required'
      : this.formGroup.get('name')?.hasError('minlength')
      ? 'Name must be at least 3 characters long '
      : this.formGroup.get('name')?.hasError('maxlength')
      ? 'Name should be max.15 characters long '
      : '';
  }

  getErrorPhone() {
    return this.formGroup.get('myphone')?.hasError('required')
      ? 'The field is required'
      : this.formGroup.get('myphone')?.hasError('alreadyTaken')
      ? 'This phone is already in use !'
      : this.formGroup.get('myphone')?.hasError('numberpass')
      ? 'Not valid phone number'
      : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password')?.hasError('required')
      ? 'The field is required'
      : this.formGroup.get('password')?.hasError('matching')
      ? 'Passwords are NOT identical. '
      : this.formGroup.get('password')?.hasError('minlength')
      ? 'Password must be at least 5 characters long '
      : this.formGroup.get('password')?.hasError('maxlength')
      ? 'Password can be max.20 characters long '
      : '';
  }

  getErrorPassword_val() {
    return this.formGroup.get('password_valid')?.hasError('required')
      ? 'The field is required'
      : this.formGroup.get('password_valid')?.hasError('matching')
      ? 'Passwords are NOT identical. '
      : this.formGroup.get('password_valid')?.hasError('minlength')
      ? 'Password must be at least 5 characters long '
      : this.formGroup.get('password_valid')?.hasError('maxlength')
      ? 'Password can be max.20 characters long '
      : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit() { 
    if (this.formGroup.get('myphone')?.value.area && this.formGroup.get('myphone')?.value.exchange
    &&  this.formGroup.get('myphone')?.value.subscriber) {
      this.phoneJoin =
      '+' +
      this.formGroup.get('myphone')?.value.area +
      ' ' +
      this.formGroup.get('myphone')?.value.exchange +
      ' ' +
      this.formGroup.get('myphone')?.value.subscriber;
      return this.phoneJoin ;
      
     }
     console.log('vo fuknci' +this.phoneJoin) ;
     return 
    }
 

  checkPhoneVal(control: any) {
    let enteredPhone = control?.value;
    let condi: [boolean, boolean, boolean];

    if (enteredPhone) {
      if (
        enteredPhone.area != null &&
        enteredPhone.exchange != null &&
        enteredPhone.subscriber != null
      ) {
        condi = [
          /0{3}/.test(enteredPhone.area),
          /0{3}/.test(enteredPhone.exchange),
          /0{6}/.test(enteredPhone.subscriber),
        ];

        if (
          condi[0] || condi[1] || condi[2]  || 
          (condi[1] && condi[2]) ||
          (condi[0] && condi[1] && condi[2])
        ) {
          return { numberpass: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  
  onSubmit(post: any) {
    this.post = post;

    this.onFormSubmit();

    console.log('vo submite' +this.phoneJoin) ;


    this.post = {
      user_name: this.post.name,
      phone: this.phoneJoin,
      password: this.post.password,
      password_val: this.post.password_valid,
    };

    console.log(this.post);

    this.userService.registrationUser(this.post).subscribe((data) => {
      return (this.user_registred = data);
    });

    this.onNoClick();

    setTimeout(() => { this.userService.popOpenDialog();
      
    }, 300); 


    setTimeout(() => {  this.snack.openSnackBar(
      'Your account has been created',
      'center',
      'bottom',
      4000,
      'snack-create'
    );
      
    }, 500); 

   
    
  }
}
