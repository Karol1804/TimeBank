import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EndRegisterRecord, GetRegisterRecord } from 'src/app/models/registerrecord';
import { ServicesService } from '../../services/services.service';


@Component({
  selector: 'app-service-register',
  templateUrl: './service-register.component.html',
  styleUrls: ['./service-register.component.css']
})

export class ServiceRegisterComponent implements OnInit {
  public records: GetRegisterRecord[];
  public id: number;
  public hours: number;
    
  constructor(
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadData();
    //this.reload();
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

  loadData() {
   this.servicesService.getRegisterRecords("").subscribe(recordsFromService => {
     this.records = recordsFromService
     console.log("Toto je loadDatarec:")
     console.log(this.records)
  })
  }

  endRegisterRecord(id: any, hours: any){
    let record = new EndRegisterRecord(
      this.id,
      this.hours      
    )
    if(hours == null || hours<= 0){
      alert("Zadal si nespravnu alebo ziadnu hodnotu")
    }
    else{
    this.servicesService.endRegisterRecord(id, hours, record).subscribe((result)=> {
      console.log(record)
      console.log(hours)
    })
    alert("Servis ukonceny.Pocet zapisanych hodin: " + hours)
    this.router.navigate(["services"]);
  }
    console.log("Urobil som end.")
    console.log("ID:"+id+" Hodin: "+hours)
  }

  // method for control input
  omit_special_char(event: { charCode: number; })
  {   
     var k: number;  
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
}
