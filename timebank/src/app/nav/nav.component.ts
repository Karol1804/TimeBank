import { Component, Input, OnInit } from '@angular/core';
import { GlobalStorageService } from '../services/global-storage.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  GlobalStorageService: any;
  userId: any;
  userName: any;
  user_name: string;
  phone: string;
  id: number;

  constructor( 
    private globalStorage: GlobalStorageService,
    private servicesService: ServicesService
    ) { }

  ngOnInit(): void {
    let userId = this.globalStorage.getUserId();
    let userName = this.globalStorage.getUserName();
    this.loadUser(userId);
    //this.loadId()
    console.log("userId je " + userId);
    console.log("userName je " + userName);
  }



  switchBtn() { 
    return !!this.globalStorage.getToken()
  }

  loadUser(userId: any) {
    this.servicesService.getUser(userId).subscribe(user => {
      this.user_name = user[0].user_name;
      this.phone = user[0].phone;
      this.id = user[0].id;
      console.log("Toto user:")
      console.log(user)
    })
  }
  
}




