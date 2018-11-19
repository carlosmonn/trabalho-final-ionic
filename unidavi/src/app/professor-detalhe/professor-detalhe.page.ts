import { AlertController } from '@ionic/angular';
import { Professor, ProfessorService } from './../service/professor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professor-detalhe',
  templateUrl: './professor-detalhe.page.html',
  styleUrls: ['./professor-detalhe.page.scss'],
})
export class ProfessorDetalhePage implements OnInit {

  professor: Professor;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private professorService: ProfessorService) {
    this.professor = new Professor();

    const id = this.route.snapshot.params.id;
    this.professorService.getProfessor(id)
      .then((dados) => {
        let dataNascimento = [];
        dataNascimento = dados.datanascimento.split('-');
        dados.datanascimento = dataNascimento[2] + '/' + dataNascimento[1] + '/' + dataNascimento[0];
        this.professor = dados;
      });
  }

  ngOnInit() {
  }

  editarProfessor(id: number) {
    this.router.navigate(['/professor-editar/' + id]);
  }

  async excluir(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir Professor?',
      message: 'Deseja realmente excluir este professor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelou.');
          }
        }, {
          text: 'Excluir',
          handler: () => {
            console.log('Confirmou');
            this.professorService.delete(id)
              .then(() => {
                this.router.navigate(['/professor']);
              });
          }
        }
      ]
    });

    await alert.present();
  }
}
