/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'alif-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';
  @Input() path = '';
  @Input() direction = '';
  @Input() number = '';
  @Input() star = '';

  isMobile: boolean = false;
  windowWidth: number = 0;
  mobileBreakpoint: number = 768; // You can adjust this value as needed

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
    this.checkIfMobile();
  }

  checkIfMobile(): void {
    this.isMobile = this.windowWidth <= this.mobileBreakpoint;
  }
}
