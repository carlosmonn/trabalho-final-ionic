import { AutenticarService } from './autenticar.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private sqlite: SqliteService, private autenticarService: AutenticarService) { }

  public insert(professor: Professor) {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        const sql   = 'INSERT INTO professor (id, nome, datanascimento, foto, curriculo, status)' +
                      'VALUES (?, ?, ?, ?, ?, ?)';
        const dados = [professor.id, professor.nome, professor.datanascimento,
                       professor.foto, professor.curriculo, professor.status];

        return db.executeSql(sql, dados)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(professor: Professor) {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        const sql   = 'UPDATE professor SET ' +
                      'nome = ?, datanascimento = ?, ' +
                      'foto = ?, curriculo = ?, status = ? ' +
                      'WHERE id = ?';
        const dados = [professor.nome, professor.datanascimento,
                       professor.foto, professor.curriculo, professor.status,
                       professor.id];

        return db.executeSql(sql, dados)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public delete(id: number) {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'DELETE FROM professor WHERE id = ?;';
        return db.executeSql(sql, [id])
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public deleteAll() {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('DELETE FROM professor;', [])
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(nome: string = null, pagina: number = 0, porPagina: number = 10) {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        const inicio = pagina * porPagina;
        let sql = 'SELECT * FROM professor';
        const dados = [];

        if (nome) {
          sql += ' WHERE nome LIKE ?';
          dados.push('%' + nome + '%');
        }

        sql += ' LIMIT ?, ?';
        dados.push(inicio);
        dados.push(porPagina);
        console.log(sql, dados);

        return db.executeSql(sql, dados)
          .then((data: any) => {
            const professores: any = [];
            for (let i = 0; i < data.rows.length; i++) {
              professores.push(data.rows.item(i));
            }

            return professores;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getProfessor(id: number) {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'SELECT * FROM professor WHERE id = ?';

        return db.executeSql(sql, [id])
          .then((data: any) => {
            return data.rows.item(0);
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getCount() {
    this.autenticarService.setAtualizarDataHora();

    return this.sqlite.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'SELECT COUNT(1) AS total FROM professor';

        return db.executeSql(sql, [])
          .then((data: any) => {
            return data.rows.item(0).total;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Professor {
  id: number;
  nome: string;
  datanascimento: string;
  foto: Blob;
  curriculo: string;
  status: string;
}
