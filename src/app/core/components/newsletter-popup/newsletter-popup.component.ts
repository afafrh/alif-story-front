import { Component } from '@angular/core';
import { MailchimpService } from '../../services/mailchimp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ResponsePopupComponent } from '../response-popup/response-popup.component';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.scss'],
})
export class NewsletterPopupComponent {
  signupForm: FormGroup;

  constructor(
    private mailchimp: MailchimpService,
    private fb: FormBuilder,
    private dialogRef: DialogRef<NewsletterPopupComponent>,
    private matDialog: MatDialog
  ) {
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
      lastName: this.signupForm.value.lastName,
    };

    if (this.signupForm.valid && this.signupForm.value.isChecked) {
      this.mailchimp.subscribeToNewsletter(bodyMailChimp).subscribe({
        next: () => {
          this.openDialog(
            'Votre inscription a bien été prise en compte',
            true,
            false
          );
          this.dialogRef.close();
        },
        error: (error) => {
          this.openDialog(
            'Vous êtes déjà inscrit à notre newsletter',
            false,
            true
          );
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.openDialog(
        'Veuillez remplir tous les champs et accepter les conditions',
        false,
        true
      );
    }
  }

  openDialog(message: string, isSuccess: boolean, isError: boolean) {
    // this.matDialog.closeAll();

    const dialogRef = this.matDialog.open(ResponsePopupComponent, {
      data: { message: message, isSuccess: isSuccess, isError: isError },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
