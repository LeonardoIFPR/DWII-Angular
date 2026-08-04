import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Projeto, ProjetoService } from '../projeto.service';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css',
})
export class Projetos {
  private service = inject(ProjetoService);

  projetos$ = this.service.listar();
}
