import { Component, Input, OnInit } from '@angular/core';
import { GlobalStorageService } from '../services/global-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  GlobalStorageService: any;
  userId: any;
  userName: any;

  constructor( private globalStorage: GlobalStorageService
    ) { }

  ngOnInit(): void {
    let userId = this.globalStorage.getUserId();
    let userName = this.globalStorage.getUserName();
    //this.loadId()
    console.log("userId je " + userId);
    console.log("userName je " + userName);
  }



  switchBtn() { 
    return !!this.globalStorage.getToken()
  }

   
  
}




