import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/services/global-storage.service';


@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.css']
})
export class LogoutBtnComponent implements OnInit {

 
  constructor(

   public globalstorage: GlobalStorageService

  ) { }

  ngOnInit(): void {
  }


  logout(){

 this.globalstorage.logout();
  }
}
