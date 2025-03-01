import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = "https://alif-story-services.onrender.com/api/stripe/payment";
  private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {}

  /** Initialize Stripe */
  async initStripe(): Promise<Stripe> {
    if (!this.stripe) {
      const stripeInstance = await loadStripe("pk_test_51QuN7TDbiVvEefs3oAAkgexLli8r8LUI3Q0JBTwToyiuPz4YzZ1C8bQdhw9tt5y3Uaw5spvDTSrayqIyCkgj8DSg00roL10vNO"); // Replace with your public key
      if (!stripeInstance) {
        throw new Error("Failed to initialize Stripe");
      }
      this.stripe = stripeInstance;
    }
    return this.stripe;
  }

  /** Create Payment Method */
  createPaymentMethod(
    cardElement: StripeCardElement,
    name: string,
    email: string
  ): Observable<string> {
    return from(this.initStripe()).pipe(
      switchMap((stripe) => {
        if (!stripe) return throwError(() => new Error("Stripe is not initialized"));
        return from(stripe.createPaymentMethod({ 
          type: "card",
          card: cardElement,
          billing_details: { name, email }
        }));
      }),
      switchMap((result) => {
        if (result.error) {
          return throwError(() => new Error(result.error.message));
        }
        return from([result.paymentMethod.id]); // Emit the paymentMethodId
      }),
      catchError((error) => {
        console.error("Payment Method Creation Error:", error);
        return throwError(() => error);
      })
    );
  }

  /** Process Payment */
  processPayment(
    paymentMethodId: string,
    amount: number = 7000,
    shipping: {
      name: string;
      address: {
        line1: string;
        line2?: string;
        city: string;
        state?: string;
        postal_code: string;
        country: string;
      };
    }
  ): Observable<any> {
    return this.http.post<any>(this.apiUrl, { paymentMethodId, amount, shipping }).pipe(
      catchError((error) => {
        console.error("Payment failed", error);
        return throwError(() => error);
      })
    );
  }
}
