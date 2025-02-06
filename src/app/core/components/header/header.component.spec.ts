import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports:[
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize windowWidth on ngOnInit', () => {
    component.ngOnInit();
    expect(component.windowWidth).toEqual(window.innerWidth);
  });

  it('should update windowWidth on window resize', () => {
    const resizeEvent = new Event('resize');
    const onResizeSpy = jest.spyOn(component, 'onResize');
    window.dispatchEvent(resizeEvent);
    expect(onResizeSpy).toHaveBeenCalled();
    expect(component.windowWidth).toEqual(window.innerWidth);
  });
});
