import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCookbook } from './feature-cookbook';

describe('FeatureCookbook', () => {
  let component: FeatureCookbook;
  let fixture: ComponentFixture<FeatureCookbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCookbook],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCookbook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
