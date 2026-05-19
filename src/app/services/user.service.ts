import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { enviroment } from "../../environments/environments";
import { UserRegister } from "../interfaces/interfaces";
import { email } from "@angular/forms/signals";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabase: SupabaseClient = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);

  async register(user: UserRegister) {

    console.log('INICIO REGISTER');

    const { data, error } = await this.supabase
      .from('usuarios')
      .insert({
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        edad: Number(user.edad)
      })
      .select();

    console.log('INSERT DATA:', data);
    console.log('INSERT ERROR:', error);

    if(error) {
      throw error;
    }

    console.log('USUARIO REGISTRADO');
  }
}
