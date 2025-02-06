/* eslint-disable @angular-eslint/component-selector */
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alif-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() btnText = "click me!";
  @Output() clickEvent = new EventEmitter<Event>();

  constructor(private http: HttpClient){}

  clickBtn(){
    // this.clickEvent.emit();
    this.http.get('http://localhost:3000/docs').subscribe(data => console.log(data));
    console.log("erer")
  }

}
