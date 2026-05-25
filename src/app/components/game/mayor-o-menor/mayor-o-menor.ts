import { Component, inject, signal } from '@angular/core';
import { Carta } from '../../../interfaces/interfaces';
import { PuntajeMayorMenorService } from '../../../services/puntaje-mayor-menor.service';

@Component({
  selector: 'app-mayor-o-menor',
  imports: [],
  templateUrl: './mayor-o-menor.html',
  styleUrl: './mayor-o-menor.css',
})
export class MayorOMenor {

  puntajeMayorMenorService = inject(PuntajeMayorMenorService);
  record = signal<number | null>(null);

  animando = signal(false);
  cartaAnimada = signal<Carta | null>(null);

  mazo = signal<Carta[]>([]);

  cartaActual = signal<Carta | null>(null);
  siguienteCarta = signal<Carta | null>(null);

  puntaje = signal(0);
  mensaje = signal('');
  gameOver = signal(false);

  constructor() {
    this.iniciarJuego();
    this.obtenerRecord();
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
    this.puntaje.set(0);
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
    if (this.mazo().length === 0 || this.gameOver()) {
      return;
    }

    const siguiente = this.mazo()[0];

    this.cartaAnimada.set(siguiente);
    this.animando.set(true);

    setTimeout(() => {

      const nuevaCarta = this.mazo().shift();
      if (!nuevaCarta || !this.cartaActual()) {
        return;
      }

      this.siguienteCarta.set(nuevaCarta);

      const valorActual = this.cartaActual()!.valor;
      const valorNuevo = nuevaCarta.valor;

      const acerto =
        (eleccion === 'mayor' && valorNuevo > valorActual) ||
        (eleccion === 'menor' && valorNuevo < valorActual);

      if (acerto) {
        this.puntaje.update(p => p + 1);
        this.cartaActual.set(nuevaCarta);
        this.mensaje.set('¡Correcto!');
        this.siguienteCarta.set(null);
      } else {

        this.subirRecord();
        this.gameOver.set(true);
        this.mensaje.set('Perdiste');

      }

      this.animando.set(false);
      this.cartaAnimada.set(null);

    }, 700);

  }

  async subirRecord() {
    await this.puntajeMayorMenorService.subirRecord(this.puntaje());
    await this.obtenerRecord();
  }

  async obtenerRecord() {
    const data = await this.puntajeMayorMenorService.obtenerRecord();

    if(data) {
      this.record.set(data.puntaje);
    }
  }
}
