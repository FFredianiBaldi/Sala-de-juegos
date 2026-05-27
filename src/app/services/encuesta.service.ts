import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../environments/environments';
import { UserService } from './user.service';
import { EncuestaInterface } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private supabase: SupabaseClient = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);

  async subirEncuesta(encuesta: EncuestaInterface) {
    const {data, error} = await this.supabase
      .from('encuestas')
      .insert([encuesta]);

    if(error) {
      console.error(error);
      throw(error);
    }

    return data;
  }
}
