/*
não sei se ocorreu no seu este, problema mas no meu estava dando algum problema que quando 
eu clicava no link para projetos ele ia e carregava os projetos no array(confirmei isso com um dbug)
mas a tela so mostrava a mesnagem Carregando projetos... o unico jeito que achei de arrumar
foi usando esse ChangeDetectorRef e chamando o metodo detectChanges() que força a tela a
atualizar e mostrar os projetos carregados não sei se fiz algo errado no meu mas 
imagino que não pois revisei bastante
*/

import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Projeto, ProjetoService } from '../projeto.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css',
})
export class Projetos implements OnInit {
  private service = inject(ProjetoService);
  private cdr = inject(ChangeDetectorRef);
  projetos: Projeto[] = [];
  carregando = true;
  erro = "";

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => {this.projetos = lista; this.carregando = false; this.cdr.detectChanges();},
      
      error: () => {this.erro = "falha ao carregar projetos"; this.carregando = false; this.cdr.detectChanges();}
    });
  }
}
