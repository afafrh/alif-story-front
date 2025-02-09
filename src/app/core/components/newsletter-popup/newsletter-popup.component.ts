import { Component } from '@angular/core';
import { MailchimpService } from '../../services/mailchimp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.scss']
})
export class NewsletterPopupComponent {
  
  signupForm: FormGroup;

  constructor(private mailchimp: MailchimpService, private fb: FormBuilder, private dialogRef: DialogRef<NewsletterPopupComponent>) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      isChecked: [false, [Validators.required]],
    });
  }

  subscribeNewsletter() {
    let bodyMailChimp = {
      email: this.signupForm.value.email,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName
    };

    if (this.signupForm.valid && this.signupForm.value.isChecked) {
      this.mailchimp.subscribeToNewsletter(bodyMailChimp).subscribe({
        next: () => {
          this.dialogRef.close();
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  
}
