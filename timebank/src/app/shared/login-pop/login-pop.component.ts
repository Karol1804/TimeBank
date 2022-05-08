import {
  NgModule,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginData } from 'src/app/models/LoginData';
import { Router } from '@angular/router';
import { GlobalStorageService } from 'src/app/services/global-storage.service';
import { UserRespond } from 'src/app/models/UserRespond';
import { AuthServService } from 'src/app/services/auth-serv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyTel } from '../pho/MyTel';
import { SnackBarService } from 'src/app/services/snackbar.service';
import CheckPhoneService from 'src/app/services/check-phone.service';
import CheckloginPhoneService from 'src/app/services/checklogin-phone.service';

@Component({
  selector: 'app-login-pop',
  templateUrl: './login-pop.component.html',
  styleUrls: ['./login-pop.component.css'],
})
export class LoginPopComponent implements OnDestroy {
  public valuePhone: string;
  private userLogedzip: UserRespond | null = null;
  public loginData: LoginData = { phone: '', password: '' };
  hide: boolean = true;

  

  constructor(
    private globalStorageService: GlobalStorageService,
    private userService: AuthServService,
    public snack: SnackBarService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginPopComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}


  public phone: FormGroup = new FormGroup({
    myphone: new FormControl(new MyTel('+', '421', '', ''), {
      validators: [Validators.required, this.checkPhoneValid],
      asyncValidators: CheckloginPhoneService.createValidator(this.userService),
    })})




  
  ngOnDestroy(): void {
    /** Az sa zatvori okno confirmom pastuje data do userLoginu a vrati to usera,savne token a presmeruje stranku */

    this.dialogRef.afterClosed().subscribe((data) => {
      
      if (data) {
        this.valuePhone =
        this.phone.get('myphone')?.value.plus +
        this.phone.get('myphone')?.value.area +
        ' ' +
        this.phone.get('myphone')?.value.exchange +
        ' ' +
        this.phone.get('myphone')?.value.subscriber;

        this.loginData = { phone: this.valuePhone, password: data.password };

        this.userService
          .userlogin(this.loginData.phone, this.loginData.password)
          .subscribe((userObject) => {
            if (userObject) {

              this.userService.tokenExtraction(userObject);
              this.userLogedzip = userObject;
              this.userService.userGetProfile().subscribe((profileRespo) => {});
              this.router.navigateByUrl('/my-services');

              this.snack.openSnackBar(
                ` Welcome back ${this.userLogedzip.user_name} !`,
                'center',
                'bottom',
                8000,
                'snack-login'
              );

              return this.userLogedzip;
            } else {
              alert('Error extract user?');
              return undefined;
            }
          });
      }
     });
  }



  checkPhoneValid (control: any) {
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
          condi[0] ||
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

  getErrorPhone() {
    return this.phone.get('myphone')?.hasError('required')
      ? 'The field is required'
      : this.phone.get('myphone')?.hasError('alreadyTaken')
      ? 'This phone as login dont exist in database'
      : this.phone.get('myphone')?.hasError('numberpass')
      ? 'Not valid phone number'
      : '';
  }

  
  get myphone() {
    return this.phone.get('myphone') as FormControl;
  }


  onRegClick(): void {
    
    this.dialogRef.close();

    setTimeout(()=>{this.userService.popOpenRegis();},800)
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
