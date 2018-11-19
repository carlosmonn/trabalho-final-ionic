import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'professores.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch((e) => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    const createTableProfessor = 'CREATE TABLE IF NOT EXISTS professor (' +
        '  id integer primary key NOT NULL,' +
        '  nome VARCHAR(100),' +
        '  datanascimento VARCHAR(10),' +
        '  foto BLOB,' +
        '  curriculo TEXT,' +
        '  status VARCHAR(10)' +
        ');';

    db.executeSql(createTableProfessor, [])
      .then(() => console.log('Tabelas criadas com sucesso'))
      .catch((e) => console.error('Não foi possível criar as tabelas', e));
  }
}
