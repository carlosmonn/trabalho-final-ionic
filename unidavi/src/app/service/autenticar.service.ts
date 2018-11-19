import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  constructor() { }

  private getHora() {
    return (Date.now() / 3600000).toString();
  }

  public setAutenticado(autenticado: string) {
    localStorage.setItem('autenticado', autenticado);
    this.setAtualizarDataHora();
  }

  public setAtualizarDataHora() {
    localStorage.setItem('datahora', this.getHora());
  }

  public usuarioAutenticado() {
    const hora1 = parseFloat(localStorage.getItem('datahora'));
    const hora2 = parseFloat(this.getHora());

    const tempoExpirado = (hora2 - hora1) >= 1;
    const autenticado = localStorage.getItem('autenticado') === 'true';

    console.log('Tempo expirado: ', tempoExpirado);
    console.log('Usuário autenticado: ', autenticado);

    if (tempoExpirado || !autenticado) {
      return false;
    }

    this.setAutenticado('true');
    return true;
  }
}
