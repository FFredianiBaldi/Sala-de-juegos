import { Injectable, signal } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { enviroment } from "../../environments/environments";
import { User } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabase: SupabaseClient = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);

  currentUser = signal<User | null>(null);

  async register(user: User) {

    const {data, error} = await this.supabase.auth.signUp({
      email:user.email,
      password:user.password
    });

    if(error) {
      throw error;
    }

    const userId = data.user?.id;

    await this.supabase
      .from('usuarios')
      .insert({
        id:userId,
        email:user.email,
        nombre: user.nombre,
        apellido:user.apellido,
        edad: Number(user.edad)
      })
  }

  async login(user: User) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password
    });

    if(error) {
      throw error
    }

    const {data: userData, error: userError} = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('email', user.email)
      .single();

    if(userError) {
      throw userError;
    }

    this.currentUser.set(userData);

    return data;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();

    if(error) {
      throw error;
    }

    this.currentUser.set(null);
  }

  async loadUser() {
    const { data: sessionData } = await this.supabase.auth.getSession();

    const session = sessionData.session;

    if(!session?.user?.email) {
      this.currentUser.set(null);
      return;
    }

    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('email', session.user.email)
      .single();

    if(error) {
      this.currentUser.set(null);
      return;
    }

    this.currentUser.set(data);
  }
}
