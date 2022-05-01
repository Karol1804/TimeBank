import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

import {map, tap} from "rxjs/operators";
import {Observable, of, Subscription} from "rxjs";
import { UserRespond } from '../models/UserRespond';
import {GlobalStorageService} from "./global-storage.service";
import { MatDialog } from '@angular/material/dialog';
import { LoginPopComponent } from '../shared/login-pop/login-pop.component';
import { apiurl } from '../url/apiUrl';




@Injectable({
  providedIn: 'root'
})


export class AuthServService {

  // returned object z metody tokenExtraction pri userlogin() {access_token:string,login:boolean,phone:string,id:number}

  public userLoggeed: UserRespond | null= null ;

  


  //** API */ 

  private api = apiurl.url;

  private apiGetUsersList =  this.api + "/users";
  private apiGetPutDelUserId = (userId: string) =>  this.api + "/users/"  + userId;
  private apiPostUserCreate =  this.api + "/user-create";
  private apiPuttUserSetPass = (userId: string) => this.api + "/user/" + userId + "/set-password";

  private apiPostUserLogin =  this.api + "/user/login";
  private apiPostUserLogout =  this.api + "/user/logout";
  private apiPostUserProfile =  this.api + "/user/profile";

  //private apiSearchUrl = this.api + "/service?q=";



  constructor ( 
    private http: HttpClient,
    private globalStorageService: GlobalStorageService,
    public dialog: MatDialog,
    ) { 
     
  
  }
 

   //**  API LOGIN @param Datalogin from dialog => return object User | undef*/ 

   userlogin(login: string, password: string): Observable<UserRespond | undefined>{

     return this.http.post(
            this.apiPostUserLogin,{phone: login, password: password},{observe: "response",}
       ).pipe(map(this.userExtraction))
   }


  //@param HTTPresponse => return userResponObject = HTTPresponse.body || undef
   
   userExtraction(res: HttpResponse<any>): UserRespond | undefined 
     {
      if (res.body) {
        return res.body;
      } 
      else {
        return undefined;
      }
     } 


   //@param userResponObject => save token, return token || undef

   tokenExtraction(userRes: UserRespond): string | undefined 
      {
        this.userLoggeed= userRes;
         if (userRes.access_token) {
           this.globalStorageService.saveToken(userRes.access_token);
           this.globalStorageService.saveUserId(userRes.id.toString());

           return userRes.access_token;
         } 
         else {
           return undefined;
         }
      }

        // pre autentifikaciu cez token do HTTP
      optionsWithToken(){
        return {
          headers: {
            "authorization": "Bearer " + this.globalStorageService.getToken()
          }
        }
      }
      
      popOpenDialog(): void {

        this.dialog.open(LoginPopComponent, {
        width: '300px',
        data: {},
          });
       
  }
}
