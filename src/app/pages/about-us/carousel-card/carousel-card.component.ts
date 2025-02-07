import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss'],
})
export class CarouselCardComponent {
  @Input() title!: string;
  @Input() image!: string;
}
