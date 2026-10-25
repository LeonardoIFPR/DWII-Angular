
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://crispy-dollop-wr64g4jr656p35r5v-3000.app.github.dev/api/login';

  private autorizado = false;
  private token = "";

  fazerLogin(dados: any) {
    return this.http.post<any>(this.apiUrl, dados);
  }

  liberarAcesso(token: string) {
    this.token = token;
    this.autorizado = true;
  }

  getToken() {
    return this.token;
  }

  estaAutenticado(): boolean {
    return this.autorizado && !!this.token;
  }
}
