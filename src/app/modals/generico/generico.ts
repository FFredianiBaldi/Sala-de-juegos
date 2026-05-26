import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generico',
  imports: [],
  templateUrl: './generico.html',
  styleUrl: './generico.css',
})
export class Generico {
  @Input() abierto: boolean = false;
  @Input() titulo:string = '';
  @Input() mensaje: string = '';
  @Input() textoBoton: string = 'Aceptar';
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
