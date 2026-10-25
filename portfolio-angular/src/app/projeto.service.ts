
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AutenticacaoService } from "./autenticacao.service";

export interface Projeto {
  id?: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link_github: string;
  ano: number;
  status: string;
}

@Injectable({providedIn: 'root'})
export class ProjetoService {
    private http = inject(HttpClient);
    private autenticacao = inject(AutenticacaoService);
    private url = "https://crispy-dollop-wr64g4jr656p35r5v-3000.app.github.dev/api/projetos";

    private cabecalhos() {
        return {
            headers: {
                Authorization: `Bearer ${this.autenticacao.getToken()}`
            }
        };
    }

    listar(): Observable<Projeto[]> {
        return this.http.get<Projeto[]>(this.url);
    }

    listarTodos(): Observable<Projeto[]> {
        return this.http.get<Projeto[]>(`${this.url}/todos`, this.cabecalhos());
    }

    criar(projeto: Projeto): Observable<{ id?: number; mensagem?: string }> {
        return this.http.post<{ id?: number; mensagem?: string }>(this.url, projeto, this.cabecalhos());
    }

    atualizar(id: number, projeto: Projeto): Observable<{ id?: number; mensagem?: string }> {
        return this.http.put<{ id?: number; mensagem?: string }>(`${this.url}/${id}`, projeto, this.cabecalhos());
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`, this.cabecalhos());
    }
}
