import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PuntajesService {
  private supabase: SupabaseClient = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);

  async obtenerPuntajes(tabla: string) {

  const { data, error } = await this.supabase
    .from(tabla)
    .select(`
      *,
      usuarios (
        nombre,
        apellido
      )
    `)
    .order('puntaje', { ascending: false })
    .limit(10);

  if(error) {
    console.error(error);
    return [];
  }

  return data;
}

}
