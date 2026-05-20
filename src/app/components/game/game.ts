import { Component, inject, signal } from '@angular/core';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorOMenor } from './mayor-o-menor/mayor-o-menor';
import { Preguntados } from './preguntados/preguntados';
import { SimonDice } from './simon-dice/simon-dice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [Ahorcado, MayorOMenor, Preguntados, SimonDice],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  private route = inject(ActivatedRoute);

  gameId = signal('');

  constructor() {
    this.route.params.subscribe(params => {
      this.gameId.set(params['id']);
    })
  }
}
