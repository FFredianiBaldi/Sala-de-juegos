import { Component, inject, signal } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { Generico } from '../../../modals/generico/generico';

@Component({
  selector: 'app-preguntados',
  imports: [Generico],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados {
  modalAbierto = signal(false);
  tituloModal = signal('');
  mensajeModal = signal('');

  tiempoRestante = signal(10);
  intervalo: any;
  tiempoMaximo = 10;

  puntaje = signal(0);

  vidas = signal(3);
  maxVidas = 3;

  indicePreguntaActual = signal(0);
  respuestaSeleccionada = signal('');

  juegoIniciado = signal(false);

  preguntadosService = inject(PreguntadosService);

  preguntas = signal<any[]>([]);
  preguntaActual = signal<any | null>(null);
  respuestas = signal<string[]>([]);

  cargando = signal(true);

  error = signal('');

  obtenerPreguntas() {
    this.cargando.set(true);

    this.preguntadosService.obtenerPreguntas().subscribe({
      next: (data) => {
        this.preguntas.set(data.questions);
        this.indicePreguntaActual.set(0);
        this.cargarPreguntaActual();
        this.cargando.set(false);
      },

      error: (error) => {
        console.error(error);
        this.error.set('Error al obtener preguntas');
        this.cargando.set(false);
      }
    })
  }

  mezclarRespuestas(respuestas: string[]) {
    for(let i = respuestas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]]
    }
  }

  iniciarJuego(){
    this.vidas.set(this.maxVidas);
    this.puntaje.set(0);
    this.juegoIniciado.set(true);
    this.obtenerPreguntas();
    this.modalAbierto.set(false);
  }

  cargarPreguntaActual() {
    const pregunta = this.preguntas()[this.indicePreguntaActual()];

    this.preguntaActual.set(pregunta);

    const opciones = [pregunta.correctAnswers, ...pregunta.incorrectAnswers];

    this.mezclarRespuestas(opciones);
    this.respuestas.set(opciones);
    this.iniciarTemporizador();
  }

  responder(respuesta:string) {

    clearInterval(this.intervalo);
    this.respuestaSeleccionada.set(respuesta);

    if(respuesta === this.preguntaActual()?.correctAnswers) {
      const bonusTiempo = this.tiempoRestante() * 10;
      this.puntaje.update(puntos => puntos + 100 + bonusTiempo)
    } else {
      this.vidas.update(vidas => vidas - 1);
    }

    setTimeout(() => {
      if(this.vidas() <= 0) {
        this.terminarJuego(false);
        return;
      }
      this.siguientePregunta();
    }, 1000)

  }

  terminarJuego(victoria: boolean) {
    clearInterval(this.intervalo);
    if(victoria) {
      this.tituloModal.set('Ganaste');
      this.mensajeModal.set(
        `Terminaste la partida con ${this.puntaje()} puntos`
      );
    } else {
      this.tituloModal.set('Perdiste');
      this.mensajeModal.set('Te quedaste sin vidas');
    }

    this.modalAbierto.set(true);
  }

  iniciarTemporizador() {
    clearInterval(this.intervalo);
    this.tiempoRestante.set(this.tiempoMaximo);
    this.intervalo = setInterval(() => {
      const tiempo = this.tiempoRestante();

      if(tiempo <= 1) {
        clearInterval(this.intervalo);
        this.vidas.update(vidas => vidas - 1);
        setTimeout(() => {
          if(this.vidas() <= 0) {
            this.terminarJuego(false);
            return;
          }
          this.siguientePregunta();
        }, 500);
        return;
      }
      this.tiempoRestante.update(t => t - 1);
    }, 1000)
  }

  siguientePregunta() {
    const siguienteIndice = this.indicePreguntaActual() + 1;

    if(siguienteIndice >= this.preguntas().length) {
      this.terminarJuego(true);
      return;
    }

    this.indicePreguntaActual.set(siguienteIndice);
    this.cargarPreguntaActual();
    this.respuestaSeleccionada.set('');
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.juegoIniciado.set(false);
    this.preguntas.set([])
    this.preguntaActual.set(null);
    this.respuestas.set([]);
    this.indicePreguntaActual.set(0);
    this.respuestaSeleccionada.set('');
  }
}
