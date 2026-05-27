import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, required, min, max, pattern, FormField } from '@angular/forms/signals';
import { EncuestaInterface } from '../../interfaces/interfaces';
import { EncuestaService } from '../../services/encuesta.service';
import { Generico } from '../../modals/generico/generico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  imports: [FormField, FormsModule, Generico],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css',
})
export class Encuesta {
  router = inject(Router);

  modalAbierto = signal(false);
  tituloModal = signal('');
  mensajeModal = signal('');

  loading = signal(false);

  submitted = signal(false);

  encuestaService = inject(EncuestaService);

  encuestaModel = signal<EncuestaInterface>({
    nombre: '',
    edad: 0,
    telefono: '',
    juego_favorito: '',
    gusto_pagina: '',
    recomendaria: false
  });

  encuestaForm = form(this.encuestaModel, (path) => {

    required(path.nombre);

    required(path.edad);
    min(path.edad, 18);
    max(path.edad, 99);

    required(path.telefono);
    pattern(path.telefono, /^[0-9]{1,10}$/);

    required(path.juego_favorito);

    required(path.gusto_pagina);

  });

  async submit() {

    if(this.loading()) return;

    this.submitted.set(true);

    if(this.encuestaForm().invalid()) {
      return;
    }

    this.loading.set(true);

    try {

      await this.encuestaService.subirEncuesta(this.encuestaModel());

      this.tituloModal.set('Completado');
      this.mensajeModal.set('Formulario enviado con exito')
      this.modalAbierto.set(true);

    } catch (error:any) {

      console.error(error);

    } finally {

      this.loading.set(false);

    }

  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.router.navigate(['']);
  }

}
