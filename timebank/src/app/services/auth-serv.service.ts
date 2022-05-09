import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProfileRespond } from '../models/profileRespond';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { UserRespond } from '../models/UserRespond';
import { GlobalStorageService } from './global-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopComponent } from '../shared/login-pop/login-pop.component';
import { apiurl } from '../url/apiUrl';
import { SnackBarService } from './snackbar.service';
import { InterceptorService } from './interceptor.service';
import { RegisUser } from '../models/RegisUser';
import { RegisUserResp } from '../models/RegisUserResp';
import { RegisPopComponent } from '../shared/regis-pop/regis-pop.component';
import { PhoneSend } from '../models/PhoneSend';
import { MyTel } from '../shared/pho/MyTel';

@Injectable({
  providedIn: 'root',
})
export class AuthServService {
  // returned object z metody tokenExtraction pri userlogin() {access_token:string,login:boolean,phone:string,id:number}

  public userLoggeed: UserRespond | null = null;
  public userProfile: ProfileRespond | null = null;

  //** API */

  private api = apiurl.url;

  private apiGetUsersList = this.api + 'users';
  private apiGetPutDelUserId = (userId: string) => this.api + 'users/' + userId;
  private apiPostUserCreate = this.api + 'user-create';
  private apiPuttUserSetPass = (userId: string) =>
    this.api + 'user/' + userId + '/set-password';

  private apiPostUserLogin = this.api + 'user/login';
  private apiPostUserLogout = this.api + 'user/logout';
  private apiPostUserProfile = this.api + 'user/profile';
  private apiPostUserPhone = this.api + 'user/phone';
  //private apiSearchUrl = this.api + "/service?q=";

  constructor(
    private http: HttpClient,
    private globalStorageService: GlobalStorageService,
    public dialog: MatDialog,
    private snackbar: SnackBarService,
    private intercept: InterceptorService
  ) {}

  //**  API LOGIN @param Datalogin from dialog => return object User | undef*/

  userlogin(
    login: string,
    password: string
  ): Observable<UserRespond | undefined> {
    return this.http
      .post(
        this.apiPostUserLogin,
        { phone: login, password: password },
        { observe: 'response' }
      )
      .pipe(map(this.userExtraction));
  }

  //@param HTTPresponse => return userResponObject = HTTPresponse.body || undef

  userExtraction(res: HttpResponse<any>): UserRespond | undefined {
    if (res.body) {
      return res.body;
    } else {
      return undefined;
    }
  }

  //@param userResponObject => save token, return token || undef

  tokenExtraction(userRes: UserRespond): string | undefined {
    this.userLoggeed = userRes;
    if (userRes.access_token) {
      this.globalStorageService.saveToken(userRes.access_token);
      this.globalStorageService.saveUserId(userRes.id.toString());
      this.globalStorageService.saveUserName(userRes.user_name);

      return userRes.access_token;
    } else {
      return undefined;
    }
  }

  popOpenDialog(): void {
    this.dialog.open(LoginPopComponent, {
      width: '300px',
      data: {},
    });
  }

  popOpenRegis(): void {
    this.dialog.open(RegisPopComponent, {
      width: '400px',
      disableClose: true,
      data: {},
    });
  }

  userGetProfile(): Observable<ProfileRespond | undefined> {
    return this.http
      .get(this.apiPostUserProfile, { observe: 'response' })
      .pipe(map(this.profileExtraction));
  }

  profileExtraction(res: HttpResponse<any>): ProfileRespond | undefined {
    if (res.body) {
      return res.body;
    } else {
      return undefined;
    }
  }

  registrationExtract(
    res: HttpResponse<RegisUserResp>
  ): RegisUserResp | undefined {
    if (res.body) {
      return res.body;
    } else {
      return undefined;
    }
  }

  registrationUser(payload: RegisUser): Observable<any | undefined> {
    return this.http
      .post<any>(this.apiPostUserCreate, payload)
      .pipe(map(this.registrationExtract));
  }

  phoneExtract(res: HttpResponse<any>): any | undefined {
    if (res) {
      return res;
    } else {
      return undefined;
    }
  }

  checkPhone(controlValue: MyTel): Observable<any | undefined> {
    let payload = {
      phone:
        controlValue.plus +
        controlValue.area +
        ' ' +
        controlValue.exchange +
        ' ' +
        controlValue.subscriber,
    };
    return this.http
      .post<any>(this.apiPostUserPhone, payload)
      .pipe(
        catchError((error) => {
          switch (error.status) {
            case 404: // 'Number doesn't exist 404
              this.snackbar.openSnackBar(
                "Phone number doesn't exist",
                'center',
                'top',
                5000,
                'snack-wrong'
              );

              break;

            case 500: // 500 internal error
              this.snackbar.openSnackBar(
                'Server error. Please try later.',
                'center',
                'top',
                5000,
                'snack-wrong'
              );

              break;

            case 0: // 0 network?
              this.snackbar.openSnackBar(
                'Network error. Please try later ',
                'center',
                'top',
                10000,
                'snack-wrong'
              );

              break;

            default: // 0 network?
              this.snackbar.openSnackBar(
                'Network user/server error. Please try later ',
                'center',
                'top',
                5000,
                'snack-wrong'
              );

              break;
          }
          return throwError(() => new Error(error));
        })
      )

      .pipe(map(this.phoneExtract));
  }
}
