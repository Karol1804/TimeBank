import { TestBed } from '@angular/core/testing';

import { CheckloginPhoneService } from './checklogin-phone.service';

describe('CheckloginPhoneService', () => {
  let service: CheckloginPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckloginPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
