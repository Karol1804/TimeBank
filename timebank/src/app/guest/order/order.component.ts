import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterRecord } from 'src/app/models/registerrecord';
import { Service } from '../../models/service';
import { ServicesService } from '../../services/services.service';
import { GlobalStorageService } from '../../services/global-storage.service';


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
  public userId: any | undefined;
  public end_time: Date | undefined;
  public user_id: number | undefined;
  public estimate: number;
  
  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private globalStorage: GlobalStorageService
    ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    let userId = this.globalStorage.getUserId();
    this.loadData(id);
    this.loadUser(userId);
  }
 
  loadData(id: number) {
    this.servicesService.getService(id).subscribe(service => {
      this.service_id = service[0].id;
      this.title = service[0].title;
      this.phone = service[0].phone;
      this.user_name = service[0].user;
      this.user_id = service[0].user_id;
      this.estimate = service[0].estimate;
      console.log("Toto je ponukany service so service_id:")
      console.log(service)
    }) 
  }

  loadUser(userId: any) {
    this.servicesService.getUser(userId).subscribe(user => {
      this.obj_user_name = user[0].user_name;
      this.obj_phone = user[0].phone;
      this.obj_id = user[0].id;
      console.log("Toto je objednavajuci s consumer_id:")
      console.log(user)
    })
  }

  createRegisterRecord(){
 
    let record = new RegisterRecord(
      this.service_id,
      this.obj_id,
      this.service_status = "inprogress",
      this.userId,
      this.hours,
      this.end_time
    )
    
    this.servicesService.createRegisterRecord(record).subscribe((result)=> {
      console.log("New service record added...")
      console.log(record)
    })
  }
}