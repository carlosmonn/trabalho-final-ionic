import { SqliteService } from './service/sqlite.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sqlite: SqliteService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.styleDefault();

    this.platform.ready().then(() => {
      this.sqlite.createDatabase()
        .then(() => {
          this.splashScreen.hide();
        }).catch(() => {
          this.splashScreen.hide();
        });
    });
  }
}
