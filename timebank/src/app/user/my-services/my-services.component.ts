import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { Userservices } from '../../models/userservices';
import { ServicesService } from '../../services/services.service';
import { GlobalStorageService } from '../../services/global-storage.service';
import { ProvRegisterRecord } from 'src/app/models/registerrecord';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  public services: Service[] | undefined;
  public userservices : Userservices[] | undefined;
  ServicesService: any;
  public user_id: number;
  public records: ProvRegisterRecord[];
  public users : User[] | undefined;
  noServices: string;
  endedServices: string;
  pleaseCreate: string;

    constructor(
    private globalStorage: GlobalStorageService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    let user_id = this.globalStorage.getUserId();
    this.user_id = Number(user_id)
    console.log(this.user_id)
    this.loadData(user_id);
    this.reload();
    console.log("Toto je User ID: " + this.user_id);
    this.loadData1()
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

  // loadData() {
  //   this.servicesService.getServices("").subscribe(servicesFromService => {
  //     this.services = servicesFromService
  //   })
  // }
  loadData(user_id: any) {
    this.servicesService.getUserServices(user_id).subscribe( userServices => {
      this.userservices = userServices
      console.log("user_id je " + user_id)
      console.log(userServices)
	  if (userServices.length == 0){
          this.noServices = "You have not created any own service.";
          this.pleaseCreate = "Please, create new one...";
      }							
    })
  }

  loadData1() {
    this.servicesService
      .getProvRegisterRecords('')
      .subscribe((recordsFromService) => {
        this.records = recordsFromService;
        console.log('Toto je loadDatarec:');
        console.log(this.records);
        // console.log(this.rating);
		if (recordsFromService.length > 0) {
          this.endedServices = "Ended services";
        }									
      });
    this.servicesService
      .getUsers("")
      .subscribe((recordsFromService) => {
        this.users = recordsFromService;
        console.log('Vsetci useri:');
        console.log(this.users);
        // console.log(this.rating);
      });
    
  }

  longTitle = true
  showLongTitle() {
    this.longTitle = !this.longTitle
  }

 
}
