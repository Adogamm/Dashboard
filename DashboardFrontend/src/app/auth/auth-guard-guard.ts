import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('authToken');

  // VALIDACION DE TOKEN
  if (!token) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  return authService.validateToken(token).pipe(
    map(valid => valid ? true : router.createUrlTree(['/login'])),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
