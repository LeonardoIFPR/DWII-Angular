import { Component, inject } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css',
})
export class Projetos {
  private service = inject(ProjetoService);

  erro = false;

  projetos$ = this.service.listar().pipe(
    catchError(() => {
      this.erro = true;
      return of([]);
    })
  );
}
