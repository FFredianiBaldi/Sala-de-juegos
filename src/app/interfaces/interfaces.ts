export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  edad: number;
  password: string;
}

export interface Mensaje {
  id: number;
  user_id: number;
  contenido: string;
  usuarios?: User;
  created_at: string;
}

export interface EncuestaInterface {
  nombre: string;
  edad: number;
  telefono: string;
  juego_favorito: string;
  gusto_pagina: string;
  recomendaria: boolean;
}

// elementos de juegos

export interface Carta {
  valor: number;
  palo: string;
}
