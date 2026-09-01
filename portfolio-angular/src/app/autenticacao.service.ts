import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://crispy-dollop-wr64g4jr656p35r5v-8000.app.github.dev/api/login.php'; 
  
  private autorizado = false;

  fazerLogin(dados: any) {
    return this.http.post<any>(this.apiUrl, dados);
  }

  liberarAcesso() {
    this.autorizado = true;
  }

  estaAutenticado(): boolean {
    return this.autorizado;
  }
}