import { Component, inject } from "@angular/core";
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../../autenticacao.service'; 

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
  private service = inject(AutenticacaoService); 

  erro = "";
  sucesso = "";
  enviando = false;

  form = this.fb.group({
    senha: ['', [Validators.required, Validators.minLength(3)]],
    usuario: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.erro = "";
    this.enviando = true;

    const dadosLogin = this.form.value;
    
    this.service.fazerLogin(dadosLogin).subscribe({
      next: (resposta: any) => {
        this.service.liberarAcesso();
        this.router.navigate(['/gestao']); 
      },
      error: (erro: any) => {
        this.erro = "Usuário ou senha incorretos!"; 
        this.enviando = false;
      }
    });
  }
}