import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificWorkspaceComponent } from './specific-workspace.component';

describe('SpecificWorkspaceComponent', () => {
  let component: SpecificWorkspaceComponent;
  let fixture: ComponentFixture<SpecificWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
