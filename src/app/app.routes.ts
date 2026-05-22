import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { WhoAmI } from './components/who-am-i/who-am-i';
import { Game } from './components/game/game';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';
import { Chat } from './components/chat/chat';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login, canActivate:[loginGuard]},
  {path: 'register', component: Register},
  {path: 'who-am-i', component: WhoAmI},

  {path: 'games/:id', component: Game, canActivate: [authGuard]},

  {path: 'chat', component:Chat, canActivate:[authGuard]}
];
