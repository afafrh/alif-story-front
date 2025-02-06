/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav} from '@angular/material/sidenav';



@Component({
  selector: 'alif-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() background = 'white';
  @Input() navListColor = '$blue';
  @Input() accountListColor = 'black';
  @ViewChild('sidenav')
  events: string[] = [];
  sidenav!: MatSidenav;
  windowWidth = 0;
  mobileView = false;

  ngOnInit(): void {
    this.onResize(null);
  }
  close() {
    this.mobileView = !this.mobileView;
  }
  togglemobile() {
    this.mobileView = !this.mobileView;
  }
  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResize(event: unknown) {
    this.windowWidth = window.innerWidth;
  }
}
