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
      "descripcion": "Descubrí la palabra antes de quedarte sin intentos. Cada letra correcta suma puntos y cada error acerca al ahorcado completo. Ganás si completás la palabra y perdés si agotás todas las vidas.",
      "img_url": "game-imgs/ahorcado.png"
    },
    {
      "nombre": "Mayor o menor",
      "descripcion": "Adiviná si la próxima carta será mayor o menor que la actual. Cada acierto aumenta tu puntuación y la dificultad continúa. Perdés al fallar una predicción.",
      "img_url": "game-imgs/mayor-o-menor.png"
    },
    {
      "nombre": "Preguntados",
      "descripcion": "Respondé correctamente preguntas de distintas categorías antes de que termine el tiempo. Cada respuesta correcta suma puntos y las incorrectas no otorgan nada. Ganás con la mayor puntuación posible.",
      "img_url": "game-imgs/preguntados.png"
    },
    {
      "nombre": "Simon dice",
      "descripcion": "Memorizá y repetí correctamente la secuencia de colores y sonidos que aparece en pantalla. Cada ronda superada suma puntos y agrega un nuevo paso a la secuencia. Perdés al equivocarte en cualquier turno.",
      "img_url": "game-imgs/simon-dice.png"
    }
  ];

}
