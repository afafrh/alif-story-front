import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: `
    <div class="stars">
      <ng-container *ngFor="let star of starsArray; let i = index">
        <span
          class="star"
          [ngClass]="{ filled: i < rating, empty: i >= rating }"
          (click)="setRating(i + 1)"
        >
          ★
        </span>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .stars {
        display: flex;
        gap: 0.3em;
        cursor: pointer;
      }
      .star {
        font-size: 2em; /* Adjustable based on parent size */
        color: #ccc;
        transition: color 0.2s, transform 0.2s;
        touch-action: manipulation;
      }
      .star.filled {
        color: gold;
      }
      .star:hover {
        transform: scale(1.2);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .star {
          font-size: 1.5em; /* Smaller stars for tablets */
        }
      }
      @media (max-width: 480px) {
        .star {
          font-size: 1.2em; /* Even smaller for mobile */
        }
        .stars {
          gap: 0.2em; /* Reduce spacing on small screens */
        }
      }
    `,
  ],
})
export class AppStarsComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  starsArray = Array(5).fill(0);

  setRating(newRating: number) {
    this.rating = newRating;
    this.ratingChange.emit(newRating);
  }
}
