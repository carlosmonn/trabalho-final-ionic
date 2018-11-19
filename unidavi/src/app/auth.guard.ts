import { AutenticarService } from './service/autenticar.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private autenticarService: AutenticarService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let autenticado: boolean;
      autenticado = this.autenticarService.usuarioAutenticado();

      if (!autenticado) {
        this.autenticarService.setAutenticado('false');
        this.router.navigate(['/login']);
      }

      this.autenticarService.setAutenticado('true');
      return autenticado;
  }
}
