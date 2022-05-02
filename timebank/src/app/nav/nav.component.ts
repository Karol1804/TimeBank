import { Component, Input, OnInit } from '@angular/core';
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
    public servicesService: ServicesService
  ) {}

  ngOnInit(): void {}

  switchBtn() {
    return !!this.globalStorage.getToken();
  }
}
