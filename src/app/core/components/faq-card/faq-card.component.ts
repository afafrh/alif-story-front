import { Component, Input } from '@angular/core';

@Component({
  selector: 'alif-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.scss']
})
export class FaqCardComponent {
  @Input() question = '';
  @Input() answer = '';
  @Input() link = '';

}
