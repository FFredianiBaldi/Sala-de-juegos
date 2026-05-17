import { Component } from '@angular/core';
import { GameCard } from './game-card/game-card';

@Component({
  selector: 'app-home',
  imports: [GameCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  games: {[key: string]: string}[] = [
    {
      "nombre": "Ahorcado",
      "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempore quis accusantium maiores nulla! Laborum eos ipsa optio fugit ex cumque sed placeat obcaecati eveniet odit, officiis, ab aperiam quaerat.",
      "img_url": "game-imgs/ahorcado.png"
    },
    {
      "nombre": "Mayor o menor",
      "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempore quis accusantium maiores nulla! Laborum eos ipsa optio fugit ex cumque sed placeat obcaecati eveniet odit, officiis, ab aperiam quaerat.",
      "img_url": "game-imgs/mayor-o-menor.png"
    },
    {
      "nombre": "Preguntados",
      "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempore quis accusantium maiores nulla! Laborum eos ipsa optio fugit ex cumque sed placeat obcaecati eveniet odit, officiis, ab aperiam quaerat.",
      "img_url": "game-imgs/preguntados.png"
    },
    {
      "nombre": "Simon dice",
      "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempore quis accusantium maiores nulla! Laborum eos ipsa optio fugit ex cumque sed placeat obcaecati eveniet odit, officiis, ab aperiam quaerat.",
      "img_url": "game-imgs/simon-dice.png"
    }
  ];

}
