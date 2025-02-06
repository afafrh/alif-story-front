/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'alif-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent  {
  @Input() name = '';
  @Input() message = '';
  @Input() date = '';
  @Input() stars = 4;
  @Input() title = '';
  @Input() path ='';

  ratingChanged($event: CustomEvent<any>) {
    this.stars = $event.detail
    console.log(this.stars)
  }
}
