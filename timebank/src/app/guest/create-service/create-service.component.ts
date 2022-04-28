import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../models/service';
import { User } from '../../models/user';
import { ServicesService } from '../../services/services.service';


@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})

export class CreateServiceComponent implements OnInit {

  public users: User[];
  public id: number;
  public title: string;
  public user:string;
  public phone: string;
  public user_id: number;
  public emptyInputError = false;

  constructor(
    private serviceService: ServicesService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.serviceService.getUsers("").subscribe(remoteUsers => {
      this.users = remoteUsers
      console.log(this.users)
    })
  }

  addNewOffer() {
    this.emptyInputError = false;
    if (!this.user_id || !this.title) {
      this.emptyInputError = true;
    } else {
      let service = new Service(this.id, this.title, this.user, this.phone, this.user_id,);
      console.log('pridavam novy service');
      console.log(service);

      this.serviceService.saveCreatedService(service).subscribe((result) => {
        console.log('new service added');
        console.log(service);
      });
      this.router.navigate(['/'])
    }
  }
}