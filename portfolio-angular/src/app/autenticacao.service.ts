import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private http = inject(HttpClient);

  private apiUrl = 'http:'; 

  fazerLogin(dados: any) {
    return this.http.post<any>(this.apiUrl, dados);
  }
}