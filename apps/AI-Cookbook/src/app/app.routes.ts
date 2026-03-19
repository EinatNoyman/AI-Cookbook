import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'cookbook', pathMatch: 'full' },
  {
    path: 'links',
    loadChildren: () => import('@bmad-demo/feature-links').then(m => m.linksRoutes),
  },
  {
    path: 'guidelines',
    loadChildren: () => import('@bmad-demo/feature-guidelines').then(m => m.guidelinesRoutes),
  },
  {
    path: 'cookbook',
    loadChildren: () => import('@bmad-demo/feature-ai-tools').then(m => m.aiToolsRoutes),
  },
  // backward-compat redirect
  { path: 'ai-tools', redirectTo: 'cookbook', pathMatch: 'full' },
];
