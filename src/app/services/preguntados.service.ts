import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private http = inject(HttpClient);
  private url = 'https://api.quiz-contest.xyz/questions';

  obtenerPreguntas() {
    const headers = new HttpHeaders({
      Authorization: enviroment.quizApiKey
    });

    return this.http.get<any>(this.url, {
      headers,
      params: {
        limit: 10,
        page: 1,
        format: 'multiple'
      }
    })
  }
}
