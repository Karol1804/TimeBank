import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { GlobalStorageService } from 'src/app/services/global-storage.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  userName = new Observable<string | undefined>(
    (observer: Observer<string | undefined>) => {
      observer.next(this.globalStorage.getUserName());
    }
  );
  
  constructor(
    private router: Router,
    public globalStorage: GlobalStorageService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  switchBtn() {
    return !!this.globalStorage.getToken();
  }
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
}
