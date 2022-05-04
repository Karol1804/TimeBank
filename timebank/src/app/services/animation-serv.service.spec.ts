import { TestBed } from '@angular/core/testing';

import { AnimationServService } from './animation-serv.service';

describe('AnimationServService', () => {
  let service: AnimationServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
