/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewsletterPopupComponent } from 'src/app/core/components/newsletter-popup/newsletter-popup.component';
import { MailchimpService } from 'src/app/core/services/mailchimp.service';
@Component({
  selector: 'alif-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  elements = [{
    title: "Un environnement apprenant",
    description: "Ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "../../../assets/images/home/pencil_stars.svg",
    width: "5rem"
  }, {
    title: "Des récits authentiques",
    description: "Ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "../../../assets/images/home/globe.svg",
    width: "6rem"
  }, {
    title: "L'ancrage dans nos valeurs",
    description: "Ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "../../../assets/images/home/pyramids.svg",
    width: "7rem"
  }, {
    title: "Un accompagnement éducatif complet",
    description: "Ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "../../../assets/images/home/kaaba.svg",
    width: "4rem"
  }];

  widgets = [{
    title: "47 récits",
    src: "../../../assets/images/icons/vocabulary.svg",
    isLastOne: false,
    type: "content"
  }, {
    type: "separator"
  }, {
    title: "7 prophètes",
    src: "../../../assets/images/icons/moon.svg",
    isLastOne: false,
    type: "content"
  }, {
    type: "separator"
  }, {
    title: "Sans ondes !",
    src: "../../../assets/images/icons/access-point-off.svg",
    isLastOne: true,
    type: "content"
  }];

  products = [{
    title: "Des livrets pédagogiques",
    imgPath: "../../../../assets/images/home/product.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
      title: "D’autres récits à télécharger",
      imgPath: "../../../../assets/images/home/product.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }];

    experiences = [{
      title: "Ecouter en famille",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      path: "../../../../assets/images/home/exp 1.png",
      number: "../../../../assets/images/home/1.svg",
      direction: "right"
    },
    {
      title: "Développer l'autonomie",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      path: "../../../../assets/images/home/exp 2.png",
      number: "../../../../assets/images/home/2.svg",
      direction: "left"
    },
    {
      title: "Objet de cercle de savoir",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      path: "../../../../assets/images/home/exp 3.png",
      number: "../../../../assets/images/home/3.svg",
      direction: "right"
    }];

  testimonials = [{
    title: "LOREM IPSUM",
    name: "Maman de Sofian",
    message: "Un cadeau parfait pour un enfant, cette boite est magnifique et ludique à la fois, un vrai plaisir !",
    path: "../../../../assets/images/home/testimonial.jpg",
    stars: 3
  }, {
    title: "LOREM IPSUM",
    name: "Papa de Théo",
    message: "Un cadeau parfait pour un enfant, cette boite est magnifique et ludique à la fois, un vrai plaisir !",
    path: "../../../../assets/images/home/testimonial.jpg",
    stars: 5
  }]

  faqs = [{
    question: "Titre de question ?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    link: ""
  }, {
    question: "Titre de question ?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    link: ""
  }, {
    question: "Titre de question ?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    link: ""
  }];

  icons = [{
    src: '../../../../assets/images/home/icon1.svg',
    txt: 'Paiement rapide, pratique et sécurisé'
  }, {
    src: '../../../../assets/images/home/icon2.svg',
    txt: 'Livraison rapide à partir de ?'
  }, {
    src: '../../../../assets/images/home/icon3.svg',
    txt: 'Service client en ligne et par téléphone'
  }];

  windowWidth = 0;

  alreadyOpen = false;

  constructor(private dialog: MatDialog, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.onResize;

    this.router.queryParamMap.subscribe({
      next: data => {
        if (data.get('isFromSocial') === 'true') {
          this.alreadyOpen = true;
          this.openDialog();
        }
        else if (!this.alreadyOpen) {
          setTimeout(() => this.openDialog(), 10000);
          this.alreadyOpen = true;
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResize(event: never) {
    this.windowWidth = window.innerWidth;
  }

  openDialog() {
    this.dialog.closeAll();
    
    const dialogRef = this.dialog.open(NewsletterPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
