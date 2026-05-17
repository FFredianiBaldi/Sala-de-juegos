import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  @Input() nombre: string = "";
  @Input() descripcion: string = "";
  @Input() img_url: string = "";
}
