import { Component, inject, signal } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ThemeService } from '@bmad-demo/shared-data';
import { ToastComponent } from '@bmad-demo/shared-ui';
import { routeAnimation } from './route-animations';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimation],
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly mobileMenuOpen = signal(false);
  private readonly contexts = inject(ChildrenOutletContexts);

  protected readonly navItems = [
    { path: '/cookbook',    label: 'AI Cookbook', icon: '📖' },
    { path: '/guidelines',  label: 'Guidelines',  icon: '📐' },
    { path: '/links',       label: 'Links',       icon: '🔗' },
  ];

  protected readonly toolPlatforms = [
    { name: 'Claude',             id: 'claude',  color: 'var(--color-claude)'  },
    { name: 'Microsoft Copilot',  id: 'copilot', color: 'var(--color-copilot)' },
    { name: 'Qodo',               id: 'qodo',    color: 'var(--color-qodo)'    },
  ];

  constructor() {
    inject(Router).events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(() => this.closeMobileMenu());
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.url;
  }
}
