import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../models/service';
import { ServicesService } from '../../services/services.service';
import {ThemePalette} from '@angular/material/core';



@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.css']
})

export class GuestLayoutComponent implements OnInit {
  public services: Service[] | undefined;
  ServicesService: any;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    
  ) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }

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