import { Component, signal } from '@angular/core';
import { Carta } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-mayor-o-menor',
  imports: [],
  templateUrl: './mayor-o-menor.html',
  styleUrl: './mayor-o-menor.css',
})
export class MayorOMenor {
  mazo = signal<Carta[]>([]);

  cartaActual = signal<Carta | null>(null);
  siguienteCarta = signal<Carta | null>(null);

  puntos = signal(0);
  mensaje = signal('');
  gameOver = signal(false);

  constructor() {
    this.iniciarJuego()
  }

  iniciarJuego() {
    const palos = ['D', 'C', 'H', 'S']; // Diamonds, Clubs, Hearts, Spades
    const nuevoMazo: Carta[] = [];

    for(let valor = 1; valor <= 13; valor++) {
      for(const palo of palos) {
        nuevoMazo.push({valor, palo});
      }
    }

    this.mezclarMazo(nuevoMazo);
    this.mazo.set(nuevoMazo);
    this.cartaActual.set(nuevoMazo.pop()!);
    this.puntos.set(0);
    this.mensaje.set('');
    this.gameOver.set(false);
    this.siguienteCarta.set(null);
  }

  mezclarMazo(mazo: Carta[]) {
    for(let i = mazo.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));

      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
  }

  jugar(eleccion: 'mayor' | 'menor') {
    if(this.gameOver()) return;

    const mazoActual = this.mazo();
    const actual = this.cartaActual();

    if(!actual || mazoActual.length === 0) return;

    const siguiente = mazoActual.pop()!;
    this.siguienteCarta.set(siguiente);

    let acerto = false;
    if(eleccion === 'mayor') {
      acerto = siguiente.valor > actual.valor;
    } else {
      acerto = siguiente.valor < actual.valor;
    }

    if(acerto) {
      this.puntos.update(p => p + 1);
      this.mensaje.set('Acertaste');
      this.cartaActual.set(siguiente);
    } else {
      this.mensaje.set('Perdiste');
      this.gameOver.set(true);
    }
  }
}
