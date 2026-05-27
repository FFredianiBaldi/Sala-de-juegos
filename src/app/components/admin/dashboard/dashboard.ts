import { Component, inject, signal } from '@angular/core';
import { EncuestaInterface } from '../../../interfaces/interfaces';
import { EncuestaService } from '../../../services/encuesta.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  encuestas = signal<EncuestaInterface[]>([]);
  encuestaService = inject(EncuestaService)

  constructor(){
    this.obtenerEncuestas();
  }

  async obtenerEncuestas() {
    this.encuestas.set(
      await this.encuestaService.obtenerEncuestas()
    );
  }
}
