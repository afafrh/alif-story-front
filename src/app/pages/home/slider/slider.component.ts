import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
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
export class SliderComponent implements OnInit, AfterViewInit {
  @ViewChildren('slide') slideElements!: QueryList<ElementRef>;

  currentSlide = 0;
  isPlaying = true;
  interval: any;
  slideWidth = 0;
  transitionEnabled = true;

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

  ngOnInit() {
    this.startAutoPlay();
  }

  ngAfterViewInit() {
    this.slideWidth = this.slideElements.first.nativeElement.offsetWidth;
    this.currentSlide = this.totalSlides;
    this.updateSlidePosition();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }

  previousSlide() {
    this.goToSlide(this.currentSlide - 1);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateSlidePosition();

    if (this.currentSlide === 0 || this.currentSlide === this.totalSlides * 2) {
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentSlide = this.totalSlides;
        this.updateSlidePosition();
        setTimeout(() => {
          this.transitionEnabled = true;
        }, 50);
      }, 500);
    }
  }

  updateSlidePosition() {
    const remInPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const slideGap = 2 * remInPx;

    const isSmallScreen = window.innerWidth <= 768;
    const offset = isSmallScreen
      ? -(this.currentSlide * (this.slideWidth + slideGap)) +
        (window.innerWidth / 2 - this.slideWidth / 2)
      : -this.currentSlide * this.slideWidth;

    const slidesContainer = document.querySelector('.slides') as HTMLElement;
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(${offset}px)`;
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
