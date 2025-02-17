/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
})
export class ConceptComponent {
  windowWidth = 0;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.onResize;
  }

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResize(event: never) {
    this.windowWidth = window.innerWidth;
  }
}
