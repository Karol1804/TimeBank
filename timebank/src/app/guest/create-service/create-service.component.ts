import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { GlobalStorageService } from 'src/app/services/global-storage.service';
import { Service } from '../../models/service';
import { User } from '../../models/user';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})
export class CreateServiceComponent implements OnInit {
  // for create new Service
  public id: number;
  public title: string;
  public user: string;
  public estimate: number;
  public avg_rating: number;
  public phone: string;
  public user_id: number;
  public emptyInputError = false;
  // load logged username, phone, id
  public obj_user_name: string;
  public obj_phone: string;
  public obj_id: number;

  constructor(
    private globalStorage: GlobalStorageService,
    private servicesService: ServicesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let userId = this.globalStorage.getUserId();
    this.loadUser(userId);
  }

  loadUser(userId: any) {
    this.servicesService.getUser(userId).subscribe((user) => {
      this.obj_user_name = user[0].user_name;
      this.obj_phone = user[0].phone;
      this.obj_id = user[0].id;
    });
  }

  // method to create new service
  addNewOffer() {
    this.emptyInputError = false;
    if (!this.title || !this.estimate) {
      this.emptyInputError = true;
    } else {
 
    let service = new Service(
      this.id,
      this.title,
      this.user,
      this.estimate,
      this.avg_rating,
      this.phone,
      (this.user_id = this.obj_id)
    );
    console.log('pridavam novy service');
    console.log(service);

    this.servicesService.saveCreatedService(service).subscribe((result) => {
      console.log('new service added');
      console.log(service);
    });
    this.router.navigate(['/'])
  }
}


  // method for control input
  omit_special_char(event: { charCode: number }) {
    var k: number;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }
}
