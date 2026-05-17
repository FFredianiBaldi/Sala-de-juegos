import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { WhoAmI } from './components/who-am-i/who-am-i';
import { Ahorcado } from './components/games/ahorcado/ahorcado';
import { MayorOMenor } from './components/games/mayor-o-menor/mayor-o-menor';
import { Preguntados } from './components/games/preguntados/preguntados';
import { SimonDice } from './components/games/simon-dice/simon-dice';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'who-am-i', component: WhoAmI},

  {path: 'ahorcado', component:Ahorcado},
  {path: 'mayor-o-menor', component:MayorOMenor},
  {path: 'preguntados', component:Preguntados},
  {path: 'simon-dice', component:SimonDice}
];
