import { Component, signal } from '@angular/core';
import { Generico } from '../../../modals/generico/generico';

@Component({
  selector: 'app-simon-dice',
  imports: [Generico],
  templateUrl: './simon-dice.html',
  styleUrl: './simon-dice.css',
})
export class SimonDice {
  modalAbierto = signal(false);
  tituloModal = signal('');
  mensajeModal = signal('');

  colores = ['rojo', 'verde', 'azul', 'amarillo'];

  secuencia = signal<string[]>([])
  secuenciaUsuario = signal<string[]>([])

  colorActivo = signal('');

  jugando = signal(false);
  bloqueado = signal(false);

  ronda = signal(0);
  puntaje = signal(0);

  iniciarJuego() {
    this.secuencia.set([]);
    this.secuenciaUsuario.set([]);
    this.ronda.set(0);
    this.puntaje.set(0);
    this.jugando.set(true);

    this.siguienteRonda();
  }

  siguienteRonda() {
    this.secuenciaUsuario.set([]);

    const colorRandom =
      this.colores[Math.floor(Math.random() * this.colores.length)];

    this.secuencia.update(seq => [...seq, colorRandom]);

    this.ronda.update(r => r + 1);

    this.mostrarSecuencia();
  }

  async mostrarSecuencia() {
    this.bloqueado.set(true);

    for (const color of this.secuencia()) {
      this.colorActivo.set(color);

      await this.esperar(600);

      this.colorActivo.set('');

      await this.esperar(300);
    }
    this.bloqueado.set(false);
  }

  esperar(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  seleccionarColor(color: string) {
    if(this.bloqueado()) return;

    const intento = [...this.secuenciaUsuario(), color];
    this.secuenciaUsuario.set(intento);
    const indice = intento.length - 1;

    if(intento[indice] !== this.secuencia()[indice]) {

      this.perder();

      return;
    }

    if(intento.length === this.secuencia().length) {

      this.puntaje.update(p => p + 100);

      setTimeout(() => {
        this.siguienteRonda();
      }, 1000);
    }
  }

  perder() {
    this.jugando.set(false);

    this.tituloModal.set('Perdiste');
    this.mensajeModal.set(
      `Llegaste a la ronda ${this.ronda()}`
    );

    this.modalAbierto.set(true);

    this.tituloModal.set('Perdiste');
    this.mensajeModal.set(
      `Llegaste a la ronda ${this.ronda()}`
    );
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.jugando.set(false);
    this.secuencia.set([]);
    this.secuenciaUsuario.set([]);
    this.colorActivo.set('');
    this.ronda.set(0);
    this.puntaje.set(0);
    this.bloqueado.set(false);
  }
}
