/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alif-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent {
  @Input() btnText = "click me!";
  @Output() clickEvent = new EventEmitter<Event>();

  click(){
    this.clickEvent.emit();
  }
}
