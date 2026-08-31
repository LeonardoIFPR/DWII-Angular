import { Component, inject } from "@angular/core";
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { autenticacao } from '../../../autenticacao.service'; 

export interface Novaautenticacao {
  usuario: string; senha: string;
}

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './autenticacao.html',
  styleUrl: './autenticacao.css'
})
export class Autenticacao { 
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private service = inject(autenticacao); 

  erro = "";

  form = this.fb.group({
    senha: ['', [Validators.required, Validators.minLength(3)]],
    usuario: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const dadosLogin = this.form.value;
    
    this.service.fazerLogin(dadosLogin).subscribe({
      next: (resposta) => {
        this.router.navigate(['/gestao']); 
      },
      error: (erro) => {
        this.erro = "Usuário ou senha incorretos!"; 
      }
    });
  }
}