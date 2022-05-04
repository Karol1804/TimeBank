import { TestBed } from '@angular/core/testing';

import { NavbarServService } from './navbar-serv.service';

describe('NavbarServService', () => {
  let service: NavbarServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
