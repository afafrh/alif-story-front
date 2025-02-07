import { Component } from '@angular/core';
import { MailchimpService } from '../../services/mailchimp.service';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.scss']
})
export class NewsletterPopupComponent {
  firstName!: string;
  lastName!: string;
  email!: string;
  isChecked!: boolean

  constructor(private mailchimp: MailchimpService) {}

  subscribeNewsletter() {
    let bodyMailChimp = {
      email_address: this.email,
      status: 'subscribed',
      language: 'FR',
      merge_fields: {
        FNAME: this.firstName,
        LNAME: this.lastName
      }
    };

    this.mailchimp.subscribeToNewsletter(bodyMailChimp).subscribe();
  }

}
