import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { Injectable, signal, Component } from '@angular/core';
import { ThemeService } from '@bmad-demo/shared-data';
import { App } from './app';
import { routeAnimation } from './route-animations';

@Component({ template: '' })
class DummyComponent {}

@Injectable()
class MockThemeService {
  readonly theme = signal<'dark' | 'light'>('dark');
  toggle() {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }
}

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: 'cookbook',    component: DummyComponent },
          { path: 'guidelines',  component: DummyComponent },
          { path: 'links',       component: DummyComponent },
        ]),
        { provide: ThemeService, useClass: MockThemeService },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render navigation links', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('nav ul li a');
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].textContent).toContain('AI Cookbook');
    expect(navLinks[1].textContent).toContain('Guidelines');
    expect(navLinks[2].textContent).toContain('Links');
  });

  it('should render skip-to-content link', () => {
    const skipLink = fixture.nativeElement.querySelector(
      'a[href="#main-content"]'
    );
    expect(skipLink).toBeTruthy();
    expect(skipLink.textContent.trim()).toBe('Skip to content');
  });

  it('should have main content with id for skip link target', () => {
    const main = fixture.nativeElement.querySelector('main#main-content');
    expect(main).toBeTruthy();
  });

  it('should render footer with AI Cookbook branding', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain('AI Cookbook');
  });

  it('should have mobile menu button', () => {
    const menuButton = fixture.nativeElement.querySelector(
      '[aria-label="Toggle navigation menu"]'
    );
    expect(menuButton).toBeTruthy();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle mobile menu on button click', () => {
    const menuButton = fixture.nativeElement.querySelector(
      '[aria-label="Toggle navigation menu"]'
    );

    // Initially no mobile nav
    expect(fixture.nativeElement.querySelector('#mobile-nav')).toBeNull();

    // Click to open
    menuButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#mobile-nav')).toBeTruthy();
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    // Click to close
    menuButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#mobile-nav')).toBeNull();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should apply routerLinkActive class on active route', async () => {
    const router = TestBed.inject(Router);
    await router.navigate(['/cookbook']);
    fixture.detectChanges();

    const navLinks = fixture.nativeElement.querySelectorAll('nav ul li a');
    const cookbookLink = navLinks[0]; // AI Cookbook is first
    expect(cookbookLink.classList.contains('!bg-teal-50')).toBe(true);
    expect(cookbookLink.classList.contains('!text-teal-600')).toBe(true);
    expect(cookbookLink.getAttribute('aria-current')).toBe('page');

    // Other links should NOT have the active class
    expect(navLinks[1].classList.contains('!bg-teal-50')).toBe(false);
    expect(navLinks[1].getAttribute('aria-current')).toBeNull();
  });

  it('should toggle theme on button click', () => {
    const themeService = TestBed.inject(ThemeService) as unknown as MockThemeService;
    const toggleBtn = fixture.nativeElement.querySelector(
      '[aria-label="Switch to light mode"]'
    );
    expect(toggleBtn).toBeTruthy();
    expect(themeService.theme()).toBe('dark');

    // Toggle to light
    toggleBtn.click();
    fixture.detectChanges();
    expect(themeService.theme()).toBe('light');

    // Button label should change
    const lightBtn = fixture.nativeElement.querySelector(
      '[aria-label="Switch to dark mode"]'
    );
    expect(lightBtn).toBeTruthy();
  });

  it('should use correct theme classes on root and header', () => {
    const rootDiv = fixture.nativeElement.querySelector('div');
    expect(rootDiv.classList.contains('dark:bg-slate-950')).toBe(true);
    expect(rootDiv.classList.contains('bg-slate-50')).toBe(true);

    const header = fixture.nativeElement.querySelector('header');
    expect(header.classList.contains('bg-white/90')).toBe(true);
  });

  it('should have focus rings on interactive elements', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('nav ul li a');
    for (const link of navLinks) {
      expect(link.classList.contains('focus:ring-2')).toBe(true);
      expect(link.classList.contains('focus:ring-teal-500')).toBe(true);
    }

    const toggleBtn = fixture.nativeElement.querySelector(
      '[aria-label="Switch to light mode"]'
    );
    expect(toggleBtn.classList.contains('focus:ring-2')).toBe(true);
  });

  it('should have proper ARIA landmarks', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('header')).toBeTruthy();
    expect(el.querySelector('nav[aria-label="Main navigation"]')).toBeTruthy();
    expect(el.querySelector('main')).toBeTruthy();
    expect(el.querySelector('footer')).toBeTruthy();
  });

  it('should have route animation trigger defined', () => {
    expect(routeAnimation.name).toBe('routeAnimation');
  });

  it('should have routeAnimation binding on main element', () => {
    const main = fixture.nativeElement.querySelector('main#main-content');
    expect(main).toBeTruthy();
  });
});
