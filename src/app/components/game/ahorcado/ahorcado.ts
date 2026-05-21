import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PuntajeAhorcadoService } from '../../../services/puntaje-ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado {
  constructor() {
    this.iniciarJuego();
  }

  abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  palabra = signal('');
  letrasAdivinadas = signal<string[]>([]);
  errores = signal(0);
  puntaje = signal(0);

  maxErrores = 6;

  tiempo = signal(0);
  intervalo: any;

  userService = inject(UserService);
  puntajeAhorcadoService = inject(PuntajeAhorcadoService);

  palabras = [
    'ANGULAR',
    'SUPABASE',
    'TYPESCRIPT',
    'PROGRAMACION',
    'COMPONENTE'
  ];

  iniciarJuego() {
    const random = this.palabras[Math.floor(Math.random() * this.palabras.length)];

    this.palabra.set(random);

    this.letrasAdivinadas.set([]);

    this.errores.set(0);

    this.puntaje.set(0);

    this.tiempo.set(0);

    clearInterval(this.intervalo);

    this.intervalo = setInterval(() => {
      this.tiempo.update(t => t + 1);
    }, 1000);
  }

  palabraOculta() {
    return this.palabra()
      .split('')
      .map(letra =>
        this.letrasAdivinadas().includes(letra)
          ? letra
          : '_'
      );
  }

  async elegirLetra(letra:string) {
    if(this.letrasAdivinadas().includes(letra)) return;

    this.letrasAdivinadas.update(prev => [...prev, letra]);

    if(this.palabra().includes(letra)) {
      this.puntaje.update(p => p + 10);

      if(this.gano()) {
        this.puntaje.update(p => p + 50);
        clearInterval(this.intervalo);
        this.puntaje.update( p => p + this.calcularBonusTiempo());
        await this.subirRecord();
      }
    } else {
      this.errores.update(e => e + 1);
      this.puntaje.update(p => Math.max(0, p -5));
    }
  }

  gano() {
    return this.palabra()
      .split('')
      .every(letra =>
        this.letrasAdivinadas().includes(letra)
      );
  }

  perdio(){
    return this.errores() >= this.maxErrores;
  }

  calcularBonusTiempo() {
    return Math.max(10, 100 - this.tiempo());
  }

  async subirRecord() {
    this.userService.loadUser();

    const user = this.userService.currentUser();

    if(!user) return;

    await this.puntajeAhorcadoService.subirRecord(
      this.puntaje(),
      user,
      this.palabra(),
      this.tiempo(),
      this.letrasAdivinadas().length
    )
  }

}
