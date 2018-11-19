import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { SqliteService } from '../service/sqlite.service';
/*import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(platform: Platform, public sqlite: SqliteService) {
    /*platform.ready().then(() => {
      this.sqlite.createDatabase();
    }).catch(e => console.error(e));*/
    /*this.sqlite.createDatabase();*/
    /*console.log(this.sqlite.getDb('unidavi.db', true));*/
    /*this.sqlite.criarDatabase();*/
  }
  /*constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('create table danceMoves(name VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  teste() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table danceMoves(name VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }*/
}
