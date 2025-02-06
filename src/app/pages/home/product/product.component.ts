/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'alif-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() title = '';
  @Input() imgPath = '';
  @Input() description = '';
  @Input() url = '';

  open(url: string){
    window.open(url);
  }
}
