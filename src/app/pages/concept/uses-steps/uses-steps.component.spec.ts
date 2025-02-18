import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsesStepsComponent } from './uses-steps.component';

describe('UsesStepsComponent', () => {
  let component: UsesStepsComponent;
  let fixture: ComponentFixture<UsesStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsesStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsesStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
