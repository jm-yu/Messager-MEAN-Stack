import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MessagesComponent} from './messages/messages.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full'},
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
