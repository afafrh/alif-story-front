import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StripeService } from "../../services/stripe/stripe.service";
import { catchError, of, switchMap } from "rxjs";

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
    { value: "fr", viewValue: "France" },
    { value: "lu", viewValue: "Luxembourg" },
    { value: "ch", viewValue: "Suisse" },
    { value: "be", viewValue: "Belgique" },
  ];

  constructor(private stripeService: StripeService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: [""],
      email: [""],
      line1: [""],
      city: [""],
      postal_code: [""],
      country: ["FR"],
    });
  }

  async ngOnInit() {
    this.stripe = await this.stripeService.initStripe();
    if (!this.stripe) {
      console.error("Stripe failed to initialize");
      return;
    }

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create("card");
    this.cardElement.mount("#card-element");
  }

  async pay() {
    if (!this.stripe || !this.cardElement) {
      this.errorMessage = "Stripe not initialized";
      return;
    }

    this.loading = true;
    this.errorMessage = "";

    const paymentDetails = {
      type: "card",
      card: this.cardElement,
      billing_details: {
        name: this.paymentForm.value.name,
        email: this.paymentForm.value.email,
        address: {
          line1: this.paymentForm.value.line1,
          city: this.paymentForm.value.city,
          postal_code: this.paymentForm.value.postal_code,
          country: this.paymentForm.value.country,
        },
      },
    };

    const { paymentMethod, error } = await this.stripe.createPaymentMethod(paymentDetails);

    if (error) {
      this.errorMessage = error.message;
      this.loading = false;
      return;
    }

    console.log("Payment Method Created:", paymentMethod);

    this.stripeService
      .processPayment(paymentMethod.id, this.paymentForm.value)
      .pipe(
        catchError((error) => {
          this.loading = false;
          this.errorMessage = `Payment failed: ${error.message}`;
          return of(null);
        })
      )
      .subscribe((res) => {
        this.loading = false;
        if (res) {
          this.errorMessage = "Payment successful! 🎉";
        }
      });
  }
}
