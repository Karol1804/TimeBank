import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import { AuthServService } from './auth-serv.service';
import {GlobalStorageService} from "./global-storage.service";


@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {

  constructor(
    private globalStorageService: GlobalStorageService,
    private router: Router,
    private auth: AuthServService
  ) {}

  
  canActivate(): boolean {
    if (!this.globalStorageService.getToken()) {
      this.auth.popOpenDialog();
      return false;
    }
    return true;
  }
}