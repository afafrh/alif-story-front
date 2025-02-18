import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  @Input() golden: boolean = false; // Default is false

  testimonials = [
    {
      title: 'LOREM IPSUM',
      name: 'Maman de Sofian',
      message:
        'Un cadeau parfait pour un enfant, cette boite est magnifique et ludique à la fois, un vrai plaisir !',
      path: '../../../../assets/images/home/testimonial.jpg',
      stars: 3,
    },
    {
      title: 'LOREM IPSUM',
      name: 'Papa de Théo',
      message:
        'Un cadeau parfait pour un enfant, cette boite est magnifique et ludique à la fois, un vrai plaisir !',
      path: '../../../../assets/images/home/testimonial.jpg',
      stars: 5,
    },
  ];
}
