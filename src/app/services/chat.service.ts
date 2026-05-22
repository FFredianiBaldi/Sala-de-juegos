import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../environments/environments';
import { Mensaje } from '../interfaces/interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase: SupabaseClient = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);

  public mensajes = signal<Mensaje[]>([]);

  private userService = inject(UserService);

  async cargarMensajes() {
    const {data} = await this.supabase
      .from('mensajes')
      .select('*, usuarios(nombre, apellido)')
      .order('created_at', {ascending: true});

    if(data) this.mensajes.set(data as Mensaje[]);
  }

  escucharMensajes() {
    this.supabase.channel('sala-de-chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'mensajes'
      }, (payload) => {
        this.cargarMensajes();
      }).subscribe();
  }

  async enviarMensaje(contenido: string) {
    await this.userService.loadUser();

    const user = this.userService.currentUser();

    if(!user) return;

    const user_id = user.id;

    await this.supabase.from('mensajes')
      .insert({
        contenido,
        user_id
      })
  }
}
