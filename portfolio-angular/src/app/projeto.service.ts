import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link_github: string;
  ano: number
}

@Injectable({providedIn: 'root'})
export class ProjetoService {
    private http = inject(HttpClient)
    private url = "https://crispy-dollop-wr64g4jr656p35r5v-8000.app.github.dev/api/projetos.php";

    listar(): Observable<Projeto[]> {
        return this.http.get<Projeto[]>(this.url);
    }

    criar(projeto: Projeto): Observable<{ id?: number; mensagem?: string}> {
    return this.http.post<{id?: number; mensagem?: string }>(this.url, projeto);
    }

    atualizar(id: number, projeto: Projeto): Observable<{ id?: number; mensagem?: string }> {
        return this.http.put<{ id?: number; mensagem?: string}>(`${this.url}?id=${id}`, projeto);
    }

    excluir(id: number): Observable<{ id?: number; mensagem?: string }> {
        return this.http.delete<{ id?: number; mensagem?: string }>(`${this.url}?id=${id}`);
    }
}