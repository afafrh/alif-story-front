import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TestimonialComponent} from "../../core/components/testimonial/testimonial.component";
import {ProductComponent} from "./product/product.component";
import {MiniCardComponent} from "./mini-card/mini-card.component";
import {ExperienceComponent} from "../../core/components/experience/experience.component";
import {PrimaryButtonComponent} from "../../core/components/button/primary-button/primary-button.component";
import {SecondaryButtonComponent} from "../../core/components/button/secondary-button/secondary-button.component";
import {HttpClientModule} from "@angular/common/http";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        TestimonialComponent,
        ProductComponent,
        MiniCardComponent,
        ExperienceComponent,
        PrimaryButtonComponent,
        SecondaryButtonComponent
      ],
      imports:[
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        HttpClientModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize windowWidth on ngOnInit', () => {
    component.ngOnInit();
    expect(component.windowWidth).toEqual(0);
  });

  it('should update windowWidth on window resize', () => {
    const resizeEvent = new Event('resize');
    const onResizeSpy = jest.spyOn(component, 'onResize');
    window.dispatchEvent(resizeEvent);
    expect(onResizeSpy).toHaveBeenCalled();
    expect(component.windowWidth).toEqual(window.innerWidth);
  });
});
