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
import { FormControl, FormGroup } from '@angular/forms';
import { MyTel } from '../pho/MyTel';
import { SnackBarService } from 'src/app/services/snackbar.service';

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

  public phone: FormGroup = new FormGroup({
    // myphone: new FormControl(new MyTel('+', '', '', '')),
    myphone: new FormControl(new MyTel('+', '421', '905', '111222')),
  });

  constructor(
    private globalStorageService: GlobalStorageService,
    private userService: AuthServService,
    public snack: SnackBarService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginPopComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnDestroy(): void {
    /** Az sa zatvori okno confirmom pastuje data do userLoginu a vrati to usera,savne token a presmeruje stranku */

    this.dialogRef.afterClosed().subscribe((data) => {
      this.valuePhone =
        this.phone.get('myphone')?.value.plus +
        this.phone.get('myphone')?.value.area +
        ' ' +
        this.phone.get('myphone')?.value.exchange +
        ' ' +
        this.phone.get('myphone')?.value.subscriber;

      let condi = [
        /0{3}/.test(this.phone.get('myphone')?.value.area),
        /0{3}/.test(this.phone.get('myphone')?.value.exchange),
        /0{6}/.test(this.phone.get('myphone')?.value.subscriber),
      ];

      if (
        condi[0] ||
        (condi[1] && condi[2]) ||
        (condi[0] && condi[1] && condi[2])
      ) {
        this.snack.openSnackBar(
          'Wrong number',
          'center',
          'top',
          8000,
          'snack-wrong'
        );
        data = null;
      }

      if (data) {
        this.loginData = { phone: this.valuePhone, password: data.password };
        this.userService
          .userlogin(this.loginData.phone, this.loginData.password)
          .subscribe((userObject) => {
            if (userObject) {
              this.userService.tokenExtraction(userObject);

              this.userLogedzip = userObject;
              this.userService.userGetProfile().subscribe((profileRespo) => {
              
              });
              this.router.navigateByUrl('/my-services');
              return this.userLogedzip;
            } else {
              alert('Error extract user?');
              return undefined;
            }
          });
      }
    });
  }

  onRegClick(): void {
    this.router.navigate(['/registration']);
    this.dialogRef.close();
    //this.router.navigateByUrl('');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
