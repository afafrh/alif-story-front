import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = "http://localhost:3000/api/stripe/payment";
  private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {}

  async initStripe(): Promise<Stripe | null> {
    if (!this.stripe) {
      this.stripe = await loadStripe("pk_test_51QuN7TDbiVvEefs3oAAkgexLli8r8LUI3Q0JBTwToyiuPz4YzZ1C8bQdhw9tt5y3Uaw5spvDTSrayqIyCkgj8DSg00roL10vNO"); // Replace with your public key
    }
    return this.stripe;
  }

  createPaymentMethod(cardElement: StripeCardElement, name: string, email: string): Observable<any> {
    return from(this.initStripe()).pipe(
      switchMap((stripe) => {
        if (!stripe) return throwError(() => new Error("Stripe is not initialized"));
        return from(stripe.createPaymentMethod({ 
          type: "card",
          card: cardElement,
          billing_details: {
            name: name,
            email: email
          } 
        }));
      }),
      switchMap(({ paymentMethod, error }) => {
        if (error) return throwError(() => error);
        return new Observable((observer) => {
          observer.next(paymentMethod.id);
          observer.complete();
        });
      }),
      catchError((error) => {
        console.error("Payment Method Creation Error:", error);
        return throwError(() => error);
      })
    );
  }

  /** Process Payment */
  processPayment(paymentMethodId: string, amount: number = 7000): Observable<any> {
    return this.http.post<any>(this.apiUrl, { paymentMethodId, amount }).pipe(
      catchError((error) => {
        console.error("Payment failed", error);
        return throwError(() => error);
      })
    );
  }
}
