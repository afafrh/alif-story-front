/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'alif-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() path = '';
  @Input() direction = '';
  @Input() number = '';
  @Input() star = '';
}
