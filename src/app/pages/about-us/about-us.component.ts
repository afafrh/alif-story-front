import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  icons = [
    {
      src: '../../../../assets/images/home/icon1.svg',
      txt: 'Paiement rapide, pratique et sécurisé',
    },
    {
      src: '../../../../assets/images/home/icon2.svg',
      txt: 'Livraison rapide à partir de ?',
    },
    {
      src: '../../../../assets/images/home/icon3.svg',
      txt: 'Service client en ligne et par téléphone',
    },
  ];
}
