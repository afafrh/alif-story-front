import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { StripeService } from "../../services/stripe/stripe.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  stripe: any;
  elements: any;
  cardElement: any;
  loading = false;
  errorMessage = "";
  countries = [
    { value: "FR", viewValue: "France" },
    { value: "LU", viewValue: "Luxembourg" },
    { value: "CH", viewValue: "Suisse" },
    { value: "BE", viewValue: "Belgique" },
  ];
  country: string = "FR";
  cardErrors = "";
  formSubmitted = false;

  constructor(private stripeService: StripeService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        name: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        eemail: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
        address: ["", [Validators.required, Validators.minLength(4)]],
        city: ["", [Validators.required, Validators.minLength(2)]],
        zipCode: ["", [Validators.required, Validators.pattern(/^\d{4,10}$/)]],
      },
      { validators: [this.emailMatchValidator] }
      
    );
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email');
    const confirmEmail = control.get('eemail');
    
    if (email && confirmEmail && email.value !== confirmEmail.value) {
      confirmEmail.setErrors({ emailMismatch: true });
      return { emailMismatch: true };
    }
    
    return null;
  }

  async ngOnInit() {
    try {
      this.stripe = await this.stripeService.initStripe();
      if (!this.stripe) throw new Error("Stripe failed to initialize");

      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create("card");
      this.cardElement.mount("#card-element");

      this.cardElement.on("change", (event: any) => {
        this.cardErrors = event.error ? event.error.message : "";
      });

      // Initialize form field values from name fields
      this.paymentForm.controls['firstName'].valueChanges.subscribe(val => {
        const lastName = this.paymentForm.controls['lastName']?.value || '';
        this.paymentForm.controls['name'].setValue(`${val} ${lastName}`.trim(), { emitEvent: false });
        if (val.length < 2) {
          this.paymentForm.controls['firstName'].markAsDirty();
        }
      });

      this.paymentForm.controls['lastName'].valueChanges.subscribe(val => {
        const firstName = this.paymentForm.controls['firstName']?.value || '';
        this.paymentForm.controls['name'].setValue(`${firstName} ${val}`.trim(), { emitEvent: false });
      });
    } catch (error) {
      console.error(error);
      this.errorMessage = "Failed to initialize Stripe.";
    }
  }

  isInvalidField(field: string): boolean {
    const control = this.paymentForm.controls[field];
    return (control?.invalid && (control?.touched || control?.dirty)) ?? false;
  }

  getErrorMessage(field: string): string {
    const control = this.paymentForm.controls[field];
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Minimum ${requiredLength} caractères requis`;
    }
    if (control.errors['email']) return 'Format d\'email invalide';
    if (control.errors['pattern']) {
      if (field === 'email') return 'Format d\'email invalide';
      if (field === 'phone') return 'Format de téléphone invalide';
      if (field === 'zipCode') return 'Format de code postal invalide';
      if (field === 'firstName' || field === 'lastName') return 'Champ très court';
      return 'Format invalide';
    }
    if (control.errors['emailMismatch']) return 'Les emails ne se correspondent pas';
    
    return 'Champ invalide';
  }

  isEmailMismatch(): boolean {
    return this.paymentForm.hasError("emailMismatch") && 
           (this.paymentForm.get("eemail")?.touched || this.formSubmitted);
  }

  async pay() {
    this.formSubmitted = true;
    
    if (this.paymentForm.invalid) {
      // Scroll to the first invalid field
      const firstInvalidElement = document.querySelector('.ng-invalid');
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!this.stripe || !this.cardElement) {
      this.errorMessage = "Stripe not initialized";
      return;
    }

    this.loading = true;
    this.errorMessage = "";

    try {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.cardElement,
        billing_details: {
          name: this.paymentForm.value.name,
          email: this.paymentForm.value.email,
          phone: this.paymentForm.value.phone,
          address: {
            line1: this.paymentForm.value.address,
            city: this.paymentForm.value.city,
            postal_code: this.paymentForm.value.zipCode,
            country: this.country.toUpperCase(),
          },
        },
      });

      if (error) throw new Error(error.message);

      const shipping = {
        name: this.paymentForm.value.name,
        email: this.paymentForm.value.email,
        phone: this.paymentForm.value.phone,
        address: {
          line1: this.paymentForm.value.address,
          city: this.paymentForm.value.city,
          postal_code: this.paymentForm.value.zipCode,
          country: this.country.toUpperCase(),
        },
      };

      this.stripeService.processPayment(paymentMethod.id, 7000, shipping).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success) {
            this.errorMessage = "Payment successful! 🎉";
          } else {
            this.errorMessage = `Payment failed: ${res.error}`;
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = `Payment failed: ${err.message}`;
        },
      });
    } catch (err: any) {
      this.loading = false;
      this.errorMessage = err.message || "An error occurred.";
    }
  }
}