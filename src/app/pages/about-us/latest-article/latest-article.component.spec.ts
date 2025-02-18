import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestArticleComponent } from './latest-article-card.component';

describe('LatestArticleComponent', () => {
  let component: LatestArticleComponent;
  let fixture: ComponentFixture<LatestArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LatestArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
