import { NgModule, Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}  from '@angular/material/dialog';
import { LoginData } from 'src/app/models/LoginData';
import { Router } from '@angular/router';
import { GlobalStorageService } from 'src/app/services/global-storage.service';
import { UserRespond } from 'src/app/models/UserRespond';
import { AuthServService } from 'src/app/services/auth-serv.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MyTel } from '../pho/MyTel';


@Component({
  selector: 'app-login-pop',
  templateUrl: './login-pop.component.html',
  styleUrls: ['./login-pop.component.css']
})

export class LoginPopComponent implements OnDestroy {

  private valuePhone: string;
  private userLogedzip: UserRespond | null= null ;
  private loginData: LoginData = {phone: '', password: ''}
   hide: boolean = true;
  
  public phone: FormGroup = new FormGroup({
    myphone: new FormControl(new MyTel('+','', '', '')),
   });


  constructor (  private globalStorageService: GlobalStorageService,
    private userService: AuthServService,
    private router: Router,
    private  dialogRef:  MatDialogRef<LoginPopComponent>,
   @Inject(MAT_DIALOG_DATA) 
    public data: any) {}

 
    ngOnDestroy(): void {
  
    
        /** Az sa zatvori okno confirmom pastuje data do userLoginu a vrati to usera,savne token a presmeruje stranku */
     
        this.dialogRef.afterClosed().subscribe(data => {
        
          if (this.valuePhone) {
        this.valuePhone =
        this.phone.get('myphone')?.value.plus
        +' '+ this.phone.get('myphone')?.value.area 
        +' '+ this.phone.get('myphone')?.value.exchange
        +' '+ this.phone.get('myphone')?.value.subscriber;}

        if(data){
           
            this.loginData = {phone: this.valuePhone, password: data.password};

            this.userService.userlogin(this.loginData.phone, this.loginData.password).subscribe(
              (userObject) => {  
                console.log(userObject);
                      if(userObject){
                      
                       this.userService.tokenExtraction(userObject);
                       console.log('save TOKEN:'+ !!this.globalStorageService.getToken())
                       console.log('save UserId:'+ !!this.globalStorageService.getUserId())
      
                       this.router.navigateByUrl('');
                       this.userLogedzip= userObject;
  
                       return this.userLogedzip;
      
                      } else { alert('Error extract user?'); return undefined}}) 
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

