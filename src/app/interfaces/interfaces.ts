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

export interface UserRegister {
  email: string;
  nombre: string;
  apellido: string;
  edad: number;
  password: string;
}
