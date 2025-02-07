import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  cards = [
    { title: 'Lorem ipsum', image: 'assets/images/about-us/news-card-2.jpeg' },
    { title: 'Lorem ipsum', image: 'assets/images/about-us/news-card-2.jpeg' },
    { title: 'Lorem ipsum', image: 'assets/images/about-us/news-card-2.jpeg' },
  ];
}
