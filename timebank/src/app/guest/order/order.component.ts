import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterRecord } from 'src/app/models/registerrecord';
import { Service } from '../../models/service';
import { ServicesService } from '../../services/services.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  public services: Service[] | undefined;
  public id: number | undefined;
  public title: string | undefined;
  public user_name: string | undefined;
  public phone: string | undefined;
  public obj_user_name: string | undefined;
  public obj_phone: string | undefined;
  public obj_id: number | undefined;
  public service_id: number | undefined;
  public service_status: string | undefined;
  public hours: number | undefined;
  public userid: number | undefined;
  public end_time: Date | undefined;
  public user_id: number | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
    ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.loadData(id);
  }
 
  loadData(id: number) {
    this.servicesService.getService(id).subscribe(service => {
      this.service_id = service[0].id;
      this.title = service[0].title;
      this.phone = service[0].phone;
      this.user_name = service[0].user;
      this.user_id = service[0].user_id;
      console.log("Toto je ponukany service so service_id:")
      console.log(service)
    }) 
  }

  createRegisterRecord(){
    if(this.user_id==1) {
      this.obj_id=2
    }
    else {
      this.obj_id=1
    }
    
    let record = new RegisterRecord(
      this.service_id,
      this.obj_id,
      this.service_status = "inprogress",
      this.userid,
      this.hours,
      this.end_time
    )
    
    this.servicesService.createRegisterRecord(record).subscribe((result)=> {
      console.log("New service record added...")
      console.log(record)
    })
  }
}