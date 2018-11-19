import { Router, ActivatedRoute } from '@angular/router';
import { Professor, ProfessorService } from './../service/professor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor-editar',
  templateUrl: './professor-editar.page.html',
  styleUrls: ['./professor-editar.page.scss'],
})
export class ProfessorEditarPage implements OnInit {

  professor: Professor;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private professorService: ProfessorService) {
    this.professor = new Professor();

    const id = this.route.snapshot.params.id;
    this.professorService.getProfessor(id)
      .then((dados) => {
        dados.status = (dados.status === 'ATIVO') ? true : false;
        this.professor = dados;
      });
  }

  ngOnInit() {
  }

  salvar(id: number = null) {
    const dados: any = {};

    dados.id = id;
    dados.nome = this.professor.nome;
    dados.datanascimento = this.professor.datanascimento;
    dados.status = (this.professor.status) ? 'ATIVO' : 'INATIVO';
    dados.curriculo = this.professor.curriculo;

    if (id) {
      this.professorService.update(dados)
        .then(() => {
          this.router.navigate(['/professor']);
        })
        .catch((e) => console.error(e));
    }
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
