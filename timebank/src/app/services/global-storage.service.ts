import { Injectable } from '@angular/core';
import { UserRespond } from '../models/UserRespond';

@Injectable({
  providedIn: 'root'
})
export class GlobalStorageService {


private token: string | undefined = undefined ;
private userLoggedId: string | undefined = undefined ;

constructor() {
  let localStorageToken = localStorage.getItem("token");
  if (localStorageToken) {
    this.token = localStorageToken;
  }
}

logout() {
  this.token = undefined;
  this.userLoggedId = undefined;
  localStorage.removeItem('token');
  localStorage.removeItem('userLoggedId');
  alert('LOGGED OUT !')
  
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

saveUserId(userId: string) {
  this.userLoggedId = userId;
  localStorage.setItem("userLoggedId", userId);
}










}
