///<reference path="auth/auth.routes.ts"/>
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MessagesComponent} from './messages/messages.component';
import {AUTH_ROUTES} from './auth/auth.routes';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full'},
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
