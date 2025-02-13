import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from './core/components/button/secondary-button/secondary-button.component';
import { ExperienceComponent } from './core/components/experience/experience.component';
import { FaqCardComponent } from './core/components/faq-card/faq-card.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TestimonialComponent } from './core/components/testimonial/testimonial.component';
import { ProductComponent } from './pages/home/product/product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { MiniCardComponent } from './pages/home/mini-card/mini-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimaryButtonComponent } from './core/components/button/primary-button/primary-button.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ValueCardComponent } from './pages/about-us/value-card/value-card.component';
import { LatestArticleCardComponent } from './pages/about-us/latest-article/latest-article-card.component';
import { NewsletterPopupComponent } from './core/components/newsletter-popup/newsletter-popup.component';
import { CarouselCardComponent } from './pages/about-us/carousel-card/carousel-card.component';
import { CarouselComponent } from './pages/about-us/carousel/carousel.component';
import { HeroComponent } from './pages/about-us/hero/hero.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MiniCardComponent,
    ProductComponent,
    ExperienceComponent,
    TestimonialComponent,
    FaqCardComponent,
    AboutUsComponent,
    ValueCardComponent,
    LatestArticleCardComponent,
    NewsletterPopupComponent,
    CarouselCardComponent,
    CarouselComponent,
    HeroComponent,
    SliderComponent,
    ComingSoonComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
    NgbPaginationModule,
    HttpClientModule,
    HttpClientJsonpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'star',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/home/star.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'fullstar',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/home/fullstar.svg'
      )
    );
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
