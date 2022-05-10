import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { GlobalStorageService } from '../services/global-storage.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {
  
  userName = new Observable<string | undefined>(
    (observer: Observer<string | undefined>) => {
      observer.next(this.globalStorage.getUserName());
    }
  );

  constructor(
    private globalStorage: GlobalStorageService,
    public servicesService: ServicesService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  switchBtn() {
    return !!this.globalStorage.getToken(); }

    routeToOrders() {
      this.router.navigateByUrl('/service-register');
    }
    routeToServices() {
      this.router.navigateByUrl('/services');
    }
    routeToCreateService() {
      this.router.navigateByUrl('/create-service');
    }
    routeToProfile() {
      this.router.navigateByUrl('/userhome');
    }
    routeToMyServices() {
      this.router.navigateByUrl('/my-services');
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
  
}
