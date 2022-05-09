import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { Userservices } from '../../models/userservices';
import { ServicesService } from '../../services/services.service';
import { GlobalStorageService } from '../../services/global-storage.service';
import { ProvRegisterRecord } from 'src/app/models/registerrecord';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  public services: Service[] | undefined;
  public userservices : Userservices[] | undefined;
  ServicesService: any;
  public user_id: any | undefined;
  public records: ProvRegisterRecord[];
  

    constructor(
    private globalStorage: GlobalStorageService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    let user_id = this.globalStorage.getUserId();
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
      });
  }

  longTitle = true
  showLongTitle() {
    this.longTitle = !this.longTitle
  }

 
}
