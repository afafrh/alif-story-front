import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy,
} from '@angular/core';

interface Slide {
  image: string;
  text: string;
}

@Component({
  selector: 'alif-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('slide') slideElements!: QueryList<ElementRef>;

  currentSlide = 0;
  isPlaying = false; // Start paused to match your screenshot
  interval: any;
  slideWidth = 0;
  transitionEnabled = true;
  visibleSlidesCount = 5; // Number of visible slides
  totalWidth = 0;
  resizeTimeout: any;

  slides: Slide[] = [
    {
      image: '../../../../assets/images/home/carousel-v3/puit.svg',
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
    },
    {
      image: '../../../../assets/images/home/carousel-v3/hodhod.svg',
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
    },
    {
      image: '../../../../assets/images/home/carousel-v3/hout.svg',
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
    },
    {
      image: '../../../../assets/images/home/carousel-v3/puit.svg',
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
    },
    {
      image: '../../../../assets/images/home/carousel-v3/hodhod.svg',
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
    },
  ];

  get totalSlides(): number {
    return this.slides.length;
  }

  get loopedSlides(): Slide[] {
    return [...this.slides, ...this.slides, ...this.slides];
  }

  constructor(private renderer: Renderer2) {}

  @HostListener('window:resize')
  onResize() {
    // Clear previous timeout to prevent multiple calculations
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    // Use timeout to debounce resize events
    this.resizeTimeout = setTimeout(() => {
      this.calculateDimensions();
      this.updateCarousel(false); // Update without transition during resize
    }, 200);
  }

  ngOnInit() {
    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit() {
    // Give browser time to render slides
    setTimeout(() => {
      this.calculateDimensions();
      this.currentSlide = this.totalSlides; // Start in the middle set
      this.updateCarousel(false);
    }, 100);
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  calculateDimensions() {
    if (!this.slideElements || !this.slideElements.first) return;

    const slideEl = this.slideElements.first.nativeElement;
    // Get computed style to ensure we get the actual rendered width
    const computedStyle = window.getComputedStyle(slideEl);

    // Include the padding in width calculation
    this.slideWidth = slideEl.offsetWidth;
    this.totalWidth = window.innerWidth;
  }

  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }

  previousSlide() {
    this.goToSlide(this.currentSlide - 1);
  }

  goToSlide(index: number) {
    this.stopAutoPlay();
    this.currentSlide = index;
    this.updateCarousel(true);

    // Handle looping
    if (this.currentSlide === 0 || this.currentSlide === this.totalSlides * 2) {
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentSlide = this.totalSlides;
        this.updateCarousel(false);
        setTimeout(() => {
          this.transitionEnabled = true;
        }, 50);
      }, 500);
    }

    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  updateCarousel(withTransition = true) {
    if (!this.slideElements) return;

    // Get all slide elements
    const slideElements = this.slideElements.toArray();

    // Toggle transition based on parameter
    const slidesContainer = document.querySelector('.slides') as HTMLElement;
    if (slidesContainer) {
      if (!withTransition) {
        this.renderer.addClass(slidesContainer, 'no-transition');
      } else {
        this.renderer.removeClass(slidesContainer, 'no-transition');
      }

      // Calculate centering offset
      // The active slide should be exactly in the center
      const activeSlidePosition = this.slideWidth * this.currentSlide;
      const offset =
        this.totalWidth / 2 - this.slideWidth / 2 - activeSlidePosition;

      // Apply the transform to center the active slide
      this.renderer.setStyle(
        slidesContainer,
        'transform',
        `translateX(calc(-50% + ${offset}px))`
      );
    }

    // Apply class-based transforms for the curved effect
    slideElements.forEach((slideRef, i) => {
      const slide = slideRef.nativeElement;
      const position = i - this.currentSlide;

      // Remove all position classes first
      this.renderer.removeClass(slide, 'active');
      this.renderer.removeClass(slide, 'prev-1');
      this.renderer.removeClass(slide, 'prev-2');
      this.renderer.removeClass(slide, 'next-1');
      this.renderer.removeClass(slide, 'next-2');

      // Add the appropriate class based on position
      if (position === 0) {
        this.renderer.addClass(slide, 'active');
      } else if (position === -1) {
        this.renderer.addClass(slide, 'prev-1');
      } else if (position === -2) {
        this.renderer.addClass(slide, 'prev-2');
      } else if (position === 1) {
        this.renderer.addClass(slide, 'next-1');
      } else if (position === 2) {
        this.renderer.addClass(slide, 'next-2');
      }
      // All other slides will have no position classes
    });

    // Re-enable transition after a brief delay if it was disabled
    if (!withTransition) {
      setTimeout(() => {
        this.renderer.removeClass(slidesContainer, 'no-transition');
      }, 50);
    }
  }

  toggleAutoPlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  // Helper method to determine if a slide is the currently active one
  isActiveSlide(index: number): boolean {
    return index === this.currentSlide;
  }

  // Helper method to determine slide position relative to active slide
  getSlidePosition(index: number): string {
    const position = index - this.currentSlide;

    if (position === 0) return 'active';
    if (position === -1) return 'prev-1';
    if (position === -2) return 'prev-2';
    if (position === 1) return 'next-1';
    if (position === 2) return 'next-2';

    return ''; // Return empty string for slides outside the visible 5
  }

  private startAutoPlay() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  private stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
