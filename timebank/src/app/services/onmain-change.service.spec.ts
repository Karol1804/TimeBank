import { TestBed } from '@angular/core/testing';

import { OnmainChangeService } from './onmain-change.service';

describe('OnmainChangeService', () => {
  let service: OnmainChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnmainChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
