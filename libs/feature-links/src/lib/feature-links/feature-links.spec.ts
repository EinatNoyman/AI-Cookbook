import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureLinks } from './feature-links';

describe('FeatureLinks', () => {
  let component: FeatureLinks;
  let fixture: ComponentFixture<FeatureLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureLinks],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureLinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
