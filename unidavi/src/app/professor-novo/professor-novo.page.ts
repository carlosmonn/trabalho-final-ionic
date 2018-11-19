import { Router } from '@angular/router';
import { ProfessorService } from './../service/professor.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from '../service/professor.service';

@Component({
  selector: 'app-professor-novo',
  templateUrl: './professor-novo.page.html',
  styleUrls: ['./professor-novo.page.scss'],
})
export class ProfessorNovoPage implements OnInit {

  professor: Professor;
  constructor(
    private router: Router,
    private professorService: ProfessorService) {
    this.professor = new Professor();
  }

  ngOnInit() {
  }

  salvar() {
    const dados: any = {};

    dados.nome = this.professor.nome;
    dados.datanascimento = this.professor.datanascimento;
    dados.status = (this.professor.status) ? 'ATIVO' : 'INATIVO';
    dados.curriculo = this.professor.curriculo;

    this.professorService.insert(dados)
      .then(() => {
        this.router.navigate(['/professor']);
      })
      .catch((e) => console.error(e));
  }

  desabilitaBotao() {
    if (this.professor.nome === undefined) {
      return true;
    }

    if (this.professor.datanascimento === undefined) {
      return true;
    }

    if (this.professor.curriculo === undefined) {
      return true;
    }

    return false;
  }
}
