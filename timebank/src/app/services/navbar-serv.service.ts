import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class NavbarServService {
  public sideNavState$: Subject<boolean> = new Subject();

  constructor() { }
}
