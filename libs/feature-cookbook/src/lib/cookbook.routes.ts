import { Route } from '@angular/router';
import { CookbookListPage } from './pages/cookbook-list-page';
import { CookbookDetailPage } from './pages/cookbook-detail-page';

export const cookbookRoutes: Route[] = [
  { path: '', component: CookbookListPage },
  { path: ':id', component: CookbookDetailPage },
];
