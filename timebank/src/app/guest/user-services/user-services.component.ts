import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../models/service';
import { Userservices } from '../../models/userservices';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.css']
})
export class UserServicesComponent implements OnInit {
  public services: Service[] | undefined;
  public userservices : Userservices[] | undefined;
  ServicesService: any;

  
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
    private router: Router,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
   
  ) { }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    let user_id = this.route.snapshot.params['user_id'];
    this.loadData(user_id);
    console.log(user_id)
  }

  loadData(user_id: number) {
    this.servicesService.getUserServices(user_id).subscribe( userServices => {
      this.userservices = userServices
      console.log(userServices)
    })
 
  }


}
