
import {Component, inject, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Tecnologia, TecnologiaService } from '../tecnologia.service';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private service = inject(TecnologiaService);
  tecnologias: Tecnologia[] = [];
  carregando = true;
  erro = "";

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => {this.tecnologias = lista; this.carregando = false},
      error: () => {this.erro = "falha ao carregar o catalogo"; this.carregando = false}
    });
  }
}