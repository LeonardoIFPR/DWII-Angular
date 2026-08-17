import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface NovoContato {
  nome: string; email: string; mensagem: string;
}

export interface RespostaContato {
  sucesso: boolean; id: number; mensagem: string;
}

@Injectable({providedIn: 'root'})
export class ContatoService {
  private http = inject(HttpClient);
  private Url = "https://crispy-dollop-wr64g4jr656p35r5v-8000.app.github.dev/api/contato.php";

  enviar(dados: NovoContato): Observable<RespostaContato> {
    return this.http.post<RespostaContato>(this.Url, dados);
  }
}