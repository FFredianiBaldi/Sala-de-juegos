import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  private http = inject(HttpClient);
  private apiUrl = 'https://api.github.com/users/FFredianiBaldi'

  getUser() {
    return this.http.get<GithubUser>(this.apiUrl);
  }
}
