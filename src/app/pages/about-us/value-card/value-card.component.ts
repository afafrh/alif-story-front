import { Component, Input } from '@angular/core';

@Component({
  selector: 'alif-value-card',
  templateUrl: './value-card.component.html',
  styleUrls: ['./value-card.component.scss'],
})
export class ValueCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() backgroundImage: string = '';
  @Input() isReversed: boolean = false;
  @Input() icon: string = '';
}
