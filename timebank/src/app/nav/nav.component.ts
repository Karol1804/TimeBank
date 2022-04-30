import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from '../services/global-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {



  constructor( private globalstorage: GlobalStorageService
    ) { }

  ngOnInit(): void {
  }



  switchBtn() { return !!this.globalstorage.getToken()}




}




