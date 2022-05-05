import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { GlobalStorageService } from 'src/app/services/global-storage.service';
import { Service, UpdateService } from '../../../models/service';
import { User } from '../../../models/user';
import { ServicesService } from '../../../services/services.service';
import { Userservices } from '../../../models/userservices';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public services: Service[] | undefined;
  public userservices : Userservices[] | undefined;

  // for update Service
  public id: number;
  public service_id: number;
  public title: string;
  public user: string;
  public estimate: number;
  public avg_rating: number;
  public phone: string | undefined;
  public user_id: number | undefined;
  public emptyInputError = false;
  // load logged username, phone, id
  public user_name: string;
  

  constructor(
    private route: ActivatedRoute,
    private globalStorage: GlobalStorageService,
    private servicesService: ServicesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    let service_id = this.route.snapshot.params['id'];
    let userId = this.globalStorage.getUserId();
    this.loadUser(userId);
    this.loadData(service_id);
  }

  loadUser(userId: any) {
    this.servicesService.getUser(userId).subscribe((user) => {
      this.user_name = user[0].user_name;
      this.phone = user[0].phone;
      this.id = user[0].id;
    });
  }

  // method to update service
  updateService() {
    this.emptyInputError = false;
    if (!this.title || !this.estimate) {
      this.emptyInputError = true;
    } else {
 
    let service = new UpdateService(
      this.title,
      this.estimate,
      this.user_id
    );
    console.log('Upravujem service:');
    console.log(service);

    this.servicesService.updateService(this.service_id, service).subscribe((result) => {
      console.log('new service added');
      console.log('Service ID je ' + this.service_id);
      console.log(service);
    });
    this.router.navigate(['/my-services'])
  }
  }
  loadData(id: number) {
    this.servicesService.getService(id).subscribe(service => {
      this.service_id = service[0].id;
      this.title = service[0].title;
      this.phone = service[0].phone;
      this.user = service[0].user;
      this.user_id = service[0].user_id;
      this.estimate = service[0].estimate;
      console.log("Toto je editovany service so service_id:")
      console.log(service)
      console.log("Toto je service_id:")
      console.log(this.service_id)
    }) 
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