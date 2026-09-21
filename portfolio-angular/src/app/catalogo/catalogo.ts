import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TecnologiaService } from '../tecnologia.service';
import { AsyncPipe } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule, AsyncPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private service = inject(TecnologiaService);

  erro = false;

  tecnologias$ = this.service.listar().pipe(
    catchError(() => {
      this.erro = true;
      return of([]);
    })
  );
}
