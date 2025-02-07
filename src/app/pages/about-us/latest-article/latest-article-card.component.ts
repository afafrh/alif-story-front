import { Component, Input } from '@angular/core';

@Component({
  selector: 'alif-latest-article-card',
  templateUrl: './latest-article-card.component.html',
  styleUrls: ['./latest-article-card.component.scss'],
})
export class LatestArticleCardComponent {
  @Input() imageUrl: string = ''; // URL of the image
  @Input() title: string = ''; // Title of the article
  @Input() description: string = ''; // Description of the article
}
