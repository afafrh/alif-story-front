import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StripeService } from "../../services/stripe/stripe.service";
import { of } from "rxjs";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  stripe: any;
  elements: any;
  cardElement: any;
  paymentForm: FormGroup;
  loading = false;
  errorMessage: string = "";
  countries = [
    { value: "FR", viewValue: "France" },
    { value: "LU", viewValue: "Luxembourg" },
    { value: "CH", viewValue: "Suisse" },
    { value: "BE", viewValue: "Belgique" },
  ];

  constructor(private stripeService: StripeService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: [""],
      email: [""],
      phone: [""],
      line1: [""],
      city: [""],
      postal_code: [""],
      country: ["FR"], // Default to uppercase country code
    });
  }

  async ngOnInit() {
    try {
      this.stripe = await this.stripeService.initStripe();
      if (!this.stripe) throw new Error("Stripe failed to initialize");

      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create("card");
      this.cardElement.mount("#card-element");
    } catch (error) {
      console.error(error);
      this.errorMessage = "Failed to initialize Stripe.";
    }
  }

  async pay() {
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
            line1: this.paymentForm.value.line1,
            city: this.paymentForm.value.city,
            postal_code: this.paymentForm.value.postal_code,
            country: this.paymentForm.value.country.toUpperCase(),
          },
        },
      });

      if (error) throw new Error(error.message);

      const shipping = {
        name: this.paymentForm.value.name,
        email: this.paymentForm.value.email,
        phone: this.paymentForm.value.phone,
        address: {
          line1: this.paymentForm.value.line1,
          city: this.paymentForm.value.city,
          postal_code: this.paymentForm.value.postal_code,
          country: this.paymentForm.value.country.toUpperCase(),
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
