import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AutenticacaoService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  } else {
    router.navigate(['/autenticacao']);
    return false;
  }
};