import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../environments/environments';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private http = inject(HttpClient);
  private url = 'https://api.quiz-contest.xyz/questions';

  private supabase:SupabaseClient = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);
  private userService = inject(UserService);

  async obtenerRecord() {
    this.userService.loadUser();
    const user = this.userService.currentUser();

    if(!user) return;

    const { data, error } = await this.supabase
      .from('puntajes_preguntados')
      .select('*')
      .eq('usuario_id', user.id)
      .single();

    if(error && error.code !== 'PGRST116') {
      console.error(error);
      return null;
    }

    return data;
  }

  async subirRecord(puntaje: number) {
    this.userService.loadUser();
    const user = this.userService.currentUser();

    if(!user) return;

    const recordActual = await this.obtenerRecord();

    // si no hay record
    if(!recordActual) {
      const {error} = await this.supabase
        .from('puntajes_preguntados')
        .insert({
          usuario_id: user.id,
          puntaje: puntaje
        })
        .eq('usuario_id', user.id)
    }

    // si hay record y el puntaje recibido es mayor
    if(puntaje > recordActual['puntaje']) {
      const {error} = await this.supabase
        .from('puntajes_preguntados')
        .update({
          puntaje: puntaje,
          created_at: new Date().toISOString()
        })
        .eq('usuario_id', user.id);

        if(error) {
          console.error(error);
        }
    }
  }

  obtenerPreguntas() {
    const headers = new HttpHeaders({
      Authorization: enviroment.quizApiKey
    });

    return this.http.get<any>(this.url, {
      headers,
      params: {
        limit: 10,
        page: Math.floor(Math.random() * 16) + 1,
        format: 'multiple'
      }
    })
  }
}
