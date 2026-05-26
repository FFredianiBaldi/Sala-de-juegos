import { Component, inject, signal, ElementRef, viewChild, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  protected userService = inject(UserService);
  private chatService = inject(ChatService);

  chatContainer = viewChild<ElementRef>('chatContainer');

  mensaje = signal('');
  mensajes = this.chatService.mensajes;

  constructor() {
    this.chatService.cargarMensajes();
    this.chatService.escucharMensajes();

    effect(() => {
      this.mensajes();

      setTimeout(() => {
        const container = this.chatContainer()?.nativeElement;

        if(container) {
          container.scrollTop = container.scrollHeight;
        }
      })
    })
  }

  async enviarMensaje() {
    const contenido = this.mensaje().trim();
    if(!contenido) return;

    await this.chatService.enviarMensaje(contenido);

    this.mensaje.set('');
  }
}
