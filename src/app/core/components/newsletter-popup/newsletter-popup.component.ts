import { Component } from '@angular/core';
import { MailchimpService } from '../../services/mailchimp.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.scss']
})
export class NewsletterPopupComponent {
  
  signupForm: FormGroup;

  constructor(private mailchimp: MailchimpService, private http: HttpClient, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      isChecked: [false, [Validators.required]],
    });
  }

  sendEmail() {
    if (this.signupForm.valid && this.signupForm.value.isChecked) {
      emailjs.init('HqwUL4sxAROmfcBKk');
      emailjs.send("service_k06ov0z","template_93xhr9m",{
        to_name: "Alif story",
        from_first_name: this.signupForm.value.firstName,
        from_last_name: this.signupForm.value.lastName,
        from_email: this.signupForm.value.email,
      });
    } else {
      this.signupForm.markAsDirty();
    }
  }

  subscribeNewsletter() {
    let bodyMailChimp = {
      email_address: this.signupForm.value.email,
      status: 'subscribed',
      language: 'FR',
      merge_fields: {
        FNAME: this.signupForm.value.firstName,
        LNAME: this.signupForm.value.lastName
      }
    };

    this.mailchimp.subscribeToNewsletter(bodyMailChimp).subscribe();
  }

  subscribeUser() {
    if (this.signupForm.invalid) return;
    const mailchimpUrl = 'https://alifstory.us19.list-manage.com/subscribe/post?u=0046a81f00298c470c5a91ecf&id=130c1c99c0&f_id=00ed72e7f0'; 

    let bodyMailChimp = {
      email_address: this.signupForm.value.email,
      status: 'subscribed',
      language: 'FR',
      merge_fields: {
        FNAME: this.signupForm.value.firstName,
        LNAME: this.signupForm.value.lastName
      }
    };


    this.http.post(mailchimpUrl, bodyMailChimp, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' }),
      responseType: 'text',
    }).subscribe();
  }

}
