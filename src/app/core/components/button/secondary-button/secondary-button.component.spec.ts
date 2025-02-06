import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondaryButtonComponent } from './secondary-button.component';

describe('SecondaryButtonComponent', () => {
  let component: SecondaryButtonComponent;
  let fixture: ComponentFixture<SecondaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickEvent when click() is called', () => {
    const clickEventSpy = jest.spyOn(component.clickEvent, 'emit');
    component.click();
    expect(clickEventSpy).toHaveBeenCalled();
  });
});
