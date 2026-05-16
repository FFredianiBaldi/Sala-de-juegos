import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { WhoAmI } from './components/who-am-i/who-am-i';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'who-am-i', component: WhoAmI}
];
