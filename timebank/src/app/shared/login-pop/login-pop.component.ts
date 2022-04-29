

import { NgModule, Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}  from '@angular/material/dialog';



import { LoginData } from 'src/app/models/LoginData';
import { Router } from '@angular/router';
import { GlobalStorageService } from 'src/app/services/global-storage.service';
import { UserRespond } from 'src/app/models/UserRespond';
import { AuthServService } from 'src/app/services/auth-serv.service';


@Component({
  selector: 'app-login-pop',
  templateUrl: './login-pop.component.html',
  styleUrls: ['./login-pop.component.css']
})
export class LoginPopComponent implements OnDestroy {


  public userLogedzip: UserRespond | null= null ;
  loginData: LoginData = {phone: '', password: ''}
  regeex: RegExp = /[+]\d{3} \d{3} \d{6}/g
  hide: boolean = true;

  constructor(  
    
    private globalStorageService: GlobalStorageService,
    private userService: AuthServService,
    private router: Router,
    private  dialogRef:  MatDialogRef<LoginPopComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   ) { }

   ngOnDestroy(): void { 

      /** Az sa zatvori okno confirmom pastuje data do userLoginu a vrati to usera,savne token a presmeruje stranku */
     this.dialogRef.afterClosed().subscribe(data => {
      if( data && data.phone && data.password && this.regeex.test(data.phone)){

            this.loginData = data;
            this.userService.userlogin(this.loginData.phone, this.loginData.password).subscribe(
              (userObject) => {  
                      if(userObject){
      
                    
                       this.userService.tokenExtraction(userObject);
                       console.log('save TOKEN:'+ !!this.globalStorageService.getToken())
                       console.log('save UserId:'+ !!this.globalStorageService.getUserId())
      
                       this.router.navigateByUrl('');
                       this.userLogedzip= userObject;
  
                       return this.userLogedzip;
      
                      } else { alert('Error extract user?'); return undefined}
                    }
           ) 
      } 
       
       
    });

  }
  
 
  onRegClick():void {
    this.router.navigate(['/registration']);
    this.dialogRef.close(); 
//this.router.navigateByUrl('');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  


    
   
  

   


  















}

