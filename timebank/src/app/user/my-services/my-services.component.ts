import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  public services: Service[] | undefined;
  ServicesService: any;

  constructor(
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
    this.servicesService.getServices("").subscribe(servicesFromService => {
      this.services = servicesFromService
    })
  }



}
