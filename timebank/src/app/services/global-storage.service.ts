import { Injectable } from '@angular/core';
import { SnackBarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalStorageService {


private token: string | undefined = undefined ;
private userLoggedId: string | undefined = undefined ;
private userLoggedName: string;

constructor(private snackbar: SnackBarService) {

  let localStorageToken = localStorage.getItem("token");
  if (localStorageToken) {
    this.token = localStorageToken;
  }

  let localStorageUserid = localStorage.getItem("userLoggedId");
  if (localStorageUserid) {
    this.userLoggedId = localStorageUserid;
  }
}

logout() {
  this.token = undefined;
  this.userLoggedId = undefined;
  localStorage.removeItem('token');
  localStorage.removeItem('userLoggedId');
  this.snackbar.openSnackBar('You are logged out. Have a nice day!','center',
  'top',5000,'snack-logout')
}





getToken() {
  return this.token;
}


saveToken(token: string) {
  this.token = token;
  localStorage.setItem("token", token);
}


getUserId() {
  return this.userLoggedId;
}

getUserName() {
  return this.userLoggedName;
}

saveUserId(userId: string) {
  this.userLoggedId = userId;
  localStorage.setItem("userLoggedId", userId);
}

saveUserName(userName: string) {
  this.userLoggedName = userName;
  localStorage.setItem("userLoggedName", userName);
}











}
