import { Component, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  @Input() modalId: string = 'modal';

  @Input() title: string = '';

  @Input() message: string = '';

  show() {
    const modalElement = document.getElementById(this.modalId);

    if(modalElement) {
      const modal = new bootstrap.Modal(modalElement);

      modal.show();
    }
  }

}
