import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { GlobalStorageService } from 'src/app/services/global-storage.service';
import { NavbarServService } from 'src/app/services/navbar-serv.service';
import { animateText, onMainContentChange, onSideNavChange } from 'src/app/services/animation-serv.service';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
  animations: [ onMainContentChange, onSideNavChange, animateText ]
})
export class UserhomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  public onSideNavChange: boolean;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
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
    media: MediaMatcher,
    private navbarside: NavbarServService

  ) {

    
    this.navbarside.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this.navbarside.sideNavState$.next(this.sideNavState)
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
