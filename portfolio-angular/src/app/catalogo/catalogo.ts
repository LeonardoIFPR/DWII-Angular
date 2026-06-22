//mesma explicação do arquivo projetos.ts
import {Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Tecnologia, TecnologiaService } from '../tecnologia.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private service = inject(TecnologiaService);
  private cdr = inject(ChangeDetectorRef);
  tecnologias: Tecnologia[] = [];
  carregando = true;
  erro = "";

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => {this.tecnologias = lista; this.carregando = false; this.cdr.detectChanges();},
      error: () => {this.erro = "falha ao carregar o catalogo"; this.carregando = false; this.cdr.detectChanges();}
    });
  }
}