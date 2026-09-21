import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjetoService, Projeto } from '../projeto.service';

@Component({
  selector: 'app-gestao',
  imports: [ReactiveFormsModule],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css'
})
export class Gestao implements OnInit {
  private service = inject(ProjetoService);

  projetos: Projeto[] = [];
  carregando = true;
  erroLista = '';
  erroSalvar = '';
  editandoId: number | null = null;
  salvando = false;

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descricao: new FormControl(''),
    tecnologias: new FormControl(''),
    link_github: new FormControl(''),
    ano: new FormControl(2026, [Validators.required]),
    status: new FormControl('publicado', [Validators.required])
  });

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.carregando = true;
    this.erroLista = '';

    this.service.listarTodos().subscribe({
      next: (lista) => {
        this.projetos = lista;
        this.carregando = false;
      },
      error: () => {
        this.erroLista = 'Não foi possível carregar os projetos.';
        this.carregando = false;
      }
    });
  }

  editar(p: Projeto) {
    this.erroSalvar = '';
    this.editandoId = p.id ?? null;
    this.form.patchValue(p);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erroSalvar = '';

    const dados = this.form.value as Projeto;

    const requisicao = this.editandoId
      ? this.service.atualizar(this.editandoId, dados)
      : this.service.criar(dados);

    requisicao.subscribe({
      next: () => {
        this.salvando = false;
        this.editandoId = null;
        this.form.reset({ ano: 2026, status: 'publicado' });
        this.carregar();
      },
      error: () => {
        this.salvando = false;
        this.erroSalvar = 'Não foi possível salvar. Tente de novo.';
      }
    });
  }

  excluir(p: Projeto) {
    if (!p.id) {
      return;
    }

    if (!confirm(`Excluir o projeto "${p.nome}"? Esta acao nao pode ser desfeita.`)) {
      return;
    }

    this.erroLista = '';

    this.service.excluir(p.id).subscribe({
      next: () => {
        this.projetos = this.projetos.filter(x => x.id !== p.id);
      },
      error: () => {
        this.erroLista = 'Não foi possível excluir. Tente de novo.';
      }
    });
  }
}