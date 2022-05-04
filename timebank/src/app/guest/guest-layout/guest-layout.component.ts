import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../models/service';
import { ServicesService } from '../../services/services.service';
import {ThemePalette} from '@angular/material/core';



@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.css']
})

export class GuestLayoutComponent implements OnInit {
  public services: Service[] | undefined;
  ServicesService: any;
  color: ThemePalette = 'accent';
  public checked: boolean;
 

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    
  )  
  {
    this.checked=false;
  }
  
  goTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.loadData()
    //this.reload();
  }

  // Function to load data-gestlayout,welcomepage
  loadData() {
    
    this.servicesService.getServices("").subscribe(servicesFromService => {
    this.services = servicesFromService

    })
    //console.log(this.checked)
  }

  // Function to load data rating/sort=desc
  loadData1() {
    
    this.servicesService.getServicesDesc("desc&field=avg_rating").subscribe(servicesFromService => {
    this.services = servicesFromService

    })
  }
  
   // Function to load data rating/sort=asc
  // loadData2() {
      
  //     this.servicesService.getServicesAsc("asc&field=avg_rating").subscribe(servicesFromService => {
  //     this.services = servicesFromService
  //   })
    
  // }

 // Function of chechbox to sort by rating and load right data
  refresh(boolenvalue: boolean){

    if(this.checked == false){
      this.loadData1();
    }
    console.log(this.checked);

    if(this.checked == true){
      this.loadData();
     }  
    console.log(this.checked);
    if(this.checked == false){
      boolenvalue = !this.checked
    }
    else{
      boolenvalue = !this.checked 
  }
    //console.log(boolenvalue);
  } 
  
 
}