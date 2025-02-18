/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
})
export class ConceptComponent {
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
