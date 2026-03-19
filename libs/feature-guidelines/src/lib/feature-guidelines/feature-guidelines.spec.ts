import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureGuidelines } from './feature-guidelines';

describe('FeatureGuidelines', () => {
  let component: FeatureGuidelines;
  let fixture: ComponentFixture<FeatureGuidelines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureGuidelines],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureGuidelines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
