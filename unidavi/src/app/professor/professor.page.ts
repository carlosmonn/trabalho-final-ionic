import { AutenticarService } from './../service/autenticar.service';
import { Router } from '@angular/router';
import { ApiService } from './../service/api.service';
import { ProfessorService } from './../service/professor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SqliteService } from '../service/sqlite.service';
import { LoadingController, InfiniteScroll, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  professores: any[] = [];
  buscaNome: string = null;
  loading: any = null;
  pagina = 0;
  porPagina = 10;
  totalProfessores = 0;
  totalExibido = 0;
  constructor(
    public sqlite: SqliteService,
    private professorService: ProfessorService,
    private apiService: ApiService,
    private autenticarService: AutenticarService,
    public loadingController: LoadingController,
    public menuCtrl: MenuController,
    private router: Router) { }

  ngOnInit() {
    this.presentLoading()
      .then(() => {
        this.getAllProfessores();
      });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 0
    });
    return await this.loading.present();
  }

  ionViewDidEnter() {
    this.pagina = 0;
    this.professores = [];
    this.habilitaInfiniteScroll();
    this.getAllProfessores();
  }

  getAllProfessores() {
    return this.professorService.getAll(this.buscaNome, this.pagina, this.porPagina)
      .then((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          this.professores.push(data[i]);
        }

        this.getCountProfessores();
        this.totalExibido = this.professores.length;
        if (this.loading) {
          this.loading.dismiss();
        }
      })
      .catch((e) => console.error(e));
  }

  getCountProfessores() {
    this.professorService.getCount()
      .then((total: number) => {
        this.totalProfessores = total;
      })
      .catch((e) => console.error(e));
  }

  filtrarProfessores(ev: any) {
    this.buscaNome = ev.target.value;
    this.pagina = 0;
    this.professores = [];
    this.habilitaInfiniteScroll();
    this.getAllProfessores();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Total exibido', this.totalExibido);
      console.log('Total professores', this.totalProfessores);

      this.pagina++;
      this.getAllProfessores()
        .then(() => {
          event.target.complete();
          if (this.totalExibido >= this.totalProfessores) {
            event.target.disabled = true;
          }
        });
    }, 500);
  }

  habilitaInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  doRefresh(event) {
    console.log('Pull to refresh');

    this.apiService
      .getDadosApi('view/professor/listar.php')
      .subscribe((data) => {
        console.log(data);
        this.professorService.deleteAll()
          .then(() => {
            for (const i in data) {
              if (i) {
                this.professorService.insert(data[i]);
              }
            }

            this.pagina = 0;
            this.professores = [];
            this.habilitaInfiniteScroll();
            this.getAllProfessores()
              .then(() => {
                setTimeout(() => {
                  event.target.complete();
                }, 500);
              });
          });
      },
      err => {
        console.log(err);
      });
  }

  abrirMenu() {
    this.menuCtrl.open();
  }

  novoProfessor() {
    console.log('Novo professor');
    this.menuCtrl.close();
    this.router.navigate(['/professor-novo']);
  }

  listarProfessores() {
    console.log('Listar professores');
    this.menuCtrl.close();
    this.router.navigate(['/professor']);
  }

  detalheProfessor(id: number) {
    this.router.navigate(['/professor-detalhe/' + id]);
  }

  sair() {
    console.log('Sair');
    this.autenticarService.setAutenticado('false');
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }
}
