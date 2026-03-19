import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild } from '@angular/core';
import { EmptyStateComponent } from './empty-state';

@Component({
  standalone: true,
  imports: [EmptyStateComponent],
  template: `<ui-empty-state
    emoji="🔗"
    actionLabel="Clear filters"
    subtitle="Custom subtitle"
    (action)="actionCalled = true"
  />`,
})
class TestHostComponent {
  actionCalled = false;
  readonly emptyState = viewChild(EmptyStateComponent);
}

describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(host.emptyState()).toBeTruthy();
  });

  it('should display custom emoji', () => {
    const emojiEl = fixture.nativeElement.querySelector('.text-4xl');
    expect(emojiEl.textContent.trim()).toBe('🔗');
  });

  it('should display custom subtitle when provided', () => {
    const subtitle = fixture.nativeElement.querySelector('.text-sm.text-slate-500');
    expect(subtitle.textContent.trim()).toBe('Custom subtitle');
  });

  it('should emit action event when button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Clear filters');

    button.click();
    expect(host.actionCalled).toBe(true);
  });

  it('should render a section subtitle (at least one appears)', () => {
    const titleEl = fixture.nativeElement.querySelector('.text-lg.font-semibold');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent.trim().length).toBeGreaterThan(0);
  });
});
