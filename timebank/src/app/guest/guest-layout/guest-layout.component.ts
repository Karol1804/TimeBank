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
  color: ThemePalette = 'primary';
  public checked: boolean;
  public search : string ;
  public tit: string;
 

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    
  )  
  {
    this.checked=false;
    this.search= "";
  
  }
  
  goTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.loadData()
    // this.reload();
    
  }
  reload() {
    if (window.localStorage) {
      if (!localStorage.getItem('reload')) {
        localStorage['reload'] = true;
        window.location.reload();
      } else {
        localStorage.removeItem('reload');
      }
    }
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

  // Function to load data by search strig in title
  Search(tit:string){
    this.tit = this.search
    if(this.search.length > 2 ){
      this.loadData2(this.tit)
      this.search = ""
    }
    else{
      alert("Minimalny pocet znakov mus byt 3 ")
    }
      //console.log(this.tit) 
  
  }
  loadData2(tit:string) {
      this.servicesService.getServicesDescSearchTit(tit).subscribe(servicesFromService => {
      if(servicesFromService.length != 0) {
      this.services = servicesFromService
      }
      else {
        alert("Hladany text nebol najdeny") 
      } 
    }) 
  }
  

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

