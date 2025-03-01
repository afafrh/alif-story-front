import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.scss'],
})
export class NewsletterPopupComponent implements OnInit {
  @ViewChild('popup', { static: true }) popup!: ElementRef;
  @ViewChild('popupContent', { static: true }) popupContent!: ElementRef;
  @ViewChild('closeBtn', { static: true }) closeBtn!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.openPopup();

    // Close popup when clicking outside of it
    this.renderer.listen(this.popup.nativeElement, 'click', (event: Event) => {
      if (!this.popupContent.nativeElement.contains(event.target as Node)) {
        this.closePopup();
      }
    });

    // Close popup on button click
    this.renderer.listen(this.closeBtn.nativeElement, 'click', () => {
      this.closePopup();
    });
  }

  openPopup() {
    this.popup.nativeElement.style.display = 'flex';
  }

  closePopup() {
    this.popup.nativeElement.style.display = 'none';
  }
}