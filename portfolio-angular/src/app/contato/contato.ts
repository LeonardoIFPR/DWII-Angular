import { Component, inject} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { ContatoService, NovoContato } from '../contato.service';

@Component({
  selector: "app-contato",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./contato.html",
})

export class Contato {
  private fb = inject(FormBuilder);
  private service = inject(ContatoService);

  enviando = false; sucesso = ""; erro = "";

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    this.sucesso = ''; this.erro = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      setTimeout(() => {
        const primeiroInvalido = document.querySelector(
          'input.ng-invalid, textarea.ng-invalid'
        ) as HTMLElement | null;

        primeiroInvalido?.focus();
      });

      return;
    }

    this.enviando = true;

    this.service.enviar(this.form.getRawValue() as NovoContato).subscribe({
      next: (resp) => {
        this.sucesso = resp.mensagem;
        this.form.reset();
        this.enviando = false;
      },
      error: (err: HttpErrorResponse) => {
        const erros = err.error?.erros;

        this.erro = Array.isArray(erros)
          ? erros.join(' ')
          : 'Não foi possível enviar. Tente novamente';

        this.enviando = false;
      },
    });
  }
}