import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alif-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent {
  @Input() title = "";
  @Input() description = "";
  @Input() img = "";
  @Input() width = "";
}
