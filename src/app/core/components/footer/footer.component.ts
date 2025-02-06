/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'alif-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email = "alif-story@contact.com"
  subscribeForm = this.fb.group({
    firstName: '',
    email: ''
  })

  constructor(private fb: FormBuilder) {
  }

  subscribe() {
    console.log(this.subscribeForm.value);

  }
}
