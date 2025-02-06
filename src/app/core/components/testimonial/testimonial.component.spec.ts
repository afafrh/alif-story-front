import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialComponent } from './testimonial.component';
import {NgbRating, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";

describe('TestimonialComponent', () => {
  let component: TestimonialComponent;
  let fixture: ComponentFixture<TestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialComponent ],
      imports: [
        NgbRatingModule,
        NgbRating,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
