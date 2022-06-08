import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificProfileComponent } from './specific-profile.component';

describe('SpecificProfileComponent', () => {
  let component: SpecificProfileComponent;
  let fixture: ComponentFixture<SpecificProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
