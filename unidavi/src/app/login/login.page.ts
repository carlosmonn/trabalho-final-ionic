import { AutenticarService } from './../service/autenticar.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController, AlertController, Input, LoadingController } from '@ionic/angular';
import { ProfessorService } from '../service/professor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  senha: string;
  data: any;
  autenticado: boolean;
  prompt: any;
  loading: any = null;
  constructor(
    private apiService: ApiService,
    private router: Router,
    public toastController: ToastController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private autenticarService: AutenticarService,
    private professorService: ProfessorService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    if (this.autenticarService.usuarioAutenticado()) {
      this.router.navigate(['/professor']);
    }
  }

  entrar() {
    if (!this.usuario) {
      this.toastMensagem('Informe o usuário');
      return false;
    }

    if (!this.senha) {
      this.toastMensagem('Informe a senha');
      return false;
    }

    this.presentLoading()
      .then(() => {
        const dados = new FormData();
        dados.append('nome', this.usuario);
        dados.append('senha', this.senha);

        this.apiService
          .postDadosApi('view/usuario/login.php', dados)
          .subscribe(data => {
            console.log(data);
            this.data = data;
            if (this.data.status === 'ok') {
              this.autenticarService.setAutenticado('true');
              this.carregarProfessores();
            } else {
              this.loading.dismiss();
              this.toastMensagem(this.data.mensagem);
            }
          },
          err => {
            console.log(err);
          });
      });
  }

  carregarProfessores() {
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
            this.loading.dismiss();
            this.router.navigate(['/professor']);
          });
      },
      err => {
        console.log(err);
      });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 0
    });
    return await this.loading.present();
  }

  async toastMensagem(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  async esqueceuSenha() {
    this.prompt = await this.alertCtrl.create({
      header: 'Esqueceu sua senha?',
      message: 'Digite seu e-mail abaixo',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Ok',
          handler: (data) => {
            this.apiService
            .getDadosApi('view/usuario/listar.php?email=' + data.email)
            .subscribe(retorno => {
              if (!retorno) {
                this.alertaEmail(
                  'Usuário não encontrado',
                  'Este e-mail não foi encontrado na base de dados',
                  false
                );
              } else {
                this.alertaEmail(
                  'Nova senha enviada',
                  'Sua nova senha foi enviada para seu e-mail com sucesso',
                  true
                );
              }
            },
            err => {
              console.log(err);
            });
            return false;
          }
        }
      ]
    });

    await this.prompt.present();
  }

  async alertaEmail(
    titulo: string,
    messagem: string,
    fechar: boolean
    ) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: messagem,
      buttons: [{
        text: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          if (fechar) {
            this.prompt.dismiss();
          }
        }
      }]
    });

    await alert.present();
  }
}
