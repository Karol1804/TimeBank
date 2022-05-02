import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from '../services/global-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  userLoggedId: any;
  GlobalStorageService: any;
  userId: any;



  constructor( private globalstorage: GlobalStorageService
    ) { }

  ngOnInit(): void {
    let userId = this.globalstorage.getUserId();
    //this.loadId()
    console.log("userId je " + userId);
    
  }



  switchBtn() { 
    return !!this.globalstorage.getToken()
  }

   loadUser() {
    let user_id = this.GlobalStorageService.getUserId(); 
      console.log("Toto je ID:")
      console.log(user_id)
    }
  
}




