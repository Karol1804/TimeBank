import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisPopComponent } from './regis-pop.component';

describe('RegisPopComponent', () => {
  let component: RegisPopComponent;
  let fixture: ComponentFixture<RegisPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
