import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrls: ['./menu-btn.component.css'],
})
export class MenuBtnComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToOrders() {
    this.router.navigateByUrl('userhome/service-register');
  }
  routeToServices() {
    this.router.navigateByUrl('userhome/services');
  }
  routeToCreateService() {
    this.router.navigateByUrl('userhome/create-service');
  }
  routeToProfile() {
    this.router.navigateByUrl('userhome/userhome');
  }
  routeToMyServices() {
    this.router.navigateByUrl('userhome/my-services');
  }
}
