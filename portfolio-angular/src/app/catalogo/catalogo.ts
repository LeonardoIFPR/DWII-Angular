import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Tecnologia, TecnologiaService } from '../tecnologia.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule, AsyncPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private service = inject(TecnologiaService);

  tecnologias$ = this.service.listar();
}