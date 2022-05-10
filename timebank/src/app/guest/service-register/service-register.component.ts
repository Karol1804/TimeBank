import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import {
  EndRegisterRecord,
  GetRegisterRecord,
} from 'src/app/models/registerrecord';
import { ServicesService } from '../../services/services.service';
import { GlobalStorageService } from '../../services/global-storage.service';

@Component({
  selector: 'app-service-register',
  templateUrl: './service-register.component.html',
  styleUrls: ['./service-register.component.css'],
})
export class ServiceRegisterComponent implements OnInit {
  public records: GetRegisterRecord[];
  public id: number;
  public hours: number;
  public rating: number;
  public obj_rating: number;
  public isChecked = false;
  
  public user_id: any | undefined;

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    private globalStorage: GlobalStorageService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.reload();
    this.userId();
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

  userId() {
    this.user_id = this.globalStorage.getUserId();
      
    console.log("Toto je User id: " + this.user_id);
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    return (this.obj_rating = $event.newValue);
    console.log(this.obj_rating);
  }

  loadData() {
    this.servicesService
      .getRegisterRecords('')
      .subscribe((recordsFromService) => {
        this.records = recordsFromService;
        //console.log('Toto je loadDatarec:');
       // console.log(this.records);
      });
  }

  endRegisterRecord(id: any, hours: any) {
    let record = new EndRegisterRecord(
      id,
      hours,
      (this.rating = this.obj_rating),
    );
    if (hours == null || hours <= 0) {
      alert('You entered an incorrect or no value');
    }  else if (this.isChecked == true){
      this.servicesService
     .endRegisterRecordWR(id, hours, record)
        .subscribe((result) => {
         // console.log(record);
         // console.log(hours);
        });
      alert('The service has been terminated. Number of registered hours: ' + hours);
      this.router.navigate(['services']);
    } else if (this.rating == undefined) {
      this.rating = 0;
      this.servicesService
        .endRegisterRecord(id, hours, this.rating, record)
        .subscribe((result) => {
        //  console.log(record);
        // console.log(hours);
        });
      alert('The service has been terminated. Number of registered hours: ' + hours);
      this.router.navigate(['services']);
    } else {
      this.servicesService
        .endRegisterRecord(id, hours, this.rating, record)
        .subscribe((result) => {
         // console.log(record);
         // console.log(hours);
        });
      alert('The service has been terminated. Number of registered hours: ' + hours);
     this.router.navigate(['services']);
    }
  //  console.log('Urobil som end.');
   // console.log('ID:' + id + ' Hodin: ' + hours);
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

  longTitle = true
  showLongTitle() {
    this.longTitle = !this.longTitle
  }
}
