import { Component, inject, signal } from '@angular/core';
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-tablas-puntajes',
  imports: [],
  templateUrl: './tablas-puntajes.html',
  styleUrl: './tablas-puntajes.css',
})
export class TablasPuntajes {
  puntajesService = inject(PuntajesService);

  ahorcado = signal<any[]>([]);
  mayorMenor = signal<any[]>([]);
  preguntados = signal<any[]>([]);
  simon = signal<any[]>([]);

  constructor() {
    this.cargarRankings();
  }

  async cargarRankings() {

    this.ahorcado.set(
      await this.puntajesService.obtenerPuntajes('puntajes_ahorcado')
    );

    this.mayorMenor.set(
      await this.puntajesService.obtenerPuntajes('puntajes_mayor_menor')
    );

    this.preguntados.set(
      await this.puntajesService.obtenerPuntajes('puntajes_preguntados')
    );

    this.simon.set(
      await this.puntajesService.obtenerPuntajes('puntajes_simon_dice')
    );
  }
}
