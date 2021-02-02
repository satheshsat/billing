import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class SqlService {

  dbName: 'Billing';
  dbInstance: any;

  constructor(
    private sqlite: SQLite
  ) { }

  getDB(){
    return this.dbInstance;
  }

  async init_web() {
    let db = (<any>window).openDatabase('Billing', '1.0', 'Billing', 5 * 1024 * 1024);
    this.dbInstance = browserDBInstance(db);
    await this.dbInstance.sqlBatch(this.getTables());
  }

  async init_cordova() {
    this.dbInstance = await this.sqlite.create({
      name: 'Billing.db',
      location: 'default'
    });
    await this.dbInstance.sqlBatch(this.getTables());
  }

  buildSelectQuery( table, args ){
    let query = "SELECT * FROM " + table;
    if(args.id){
      query += " WHERE id="+args.id;
    }else if(args.date.start && args.date.end){
      query += " WHERE createdon BETWEEN '"+args.date.start+"' AND '"+args.date.end+"'";
    }

    query += " LIMIT "+args.limit+ " OFFSET "+args.offset;
    return query;
    // for (const [index, value] of where.entries()) {
    //   query += index + "='" + value + "'"
    //   console.log(index, value);
    // }
  }

  buildInsertQuery(table, args){
    args.updatedon = new Date().getTime();
    return "INSERT INTO " + table + ' (' + Object.keys(args).join() + ") VALUES ('" + Object.values(args).join("','") +  "');";
  }

  getTables(){
    let tables = [
        "CREATE TABLE IF NOT EXISTS bills ("+
        "id INTEGER PRIMARY KEY,"+
        "name TEXT NULL,"+
        "phone TEXT NULL,"+
        "email TEXT NULL,"+
        "updatedon TEXT NOT NULL,"+
        "createdon DATETIME DEFAULT CURRENT_TIMESTAMP"+
      ")",
        "CREATE TABLE IF NOT EXISTS bill_items ("+
        "id INTEGER PRIMARY KEY,"+
        "bill_id INTEGER NOT NULL,"+
        "type TEXT NOT NULL DEFAULT 'item',"+
        "name TEXT NOT NULL,"+
        "price INTEGER NOT NULL,"+
        "total_price INTEGER NOT NULL,"+
        "quantity INTEGER NULL,"+
        "unit TEXT NULL,"+
        "updatedon TEXT NOT NULL,"+
        "createdon DATETIME DEFAULT CURRENT_TIMESTAMP"+
      ")",
      "CREATE TABLE IF NOT EXISTS items ("+
        "id INTEGER PRIMARY KEY,"+
        "name TEXT NOT NULL,"+
        "price INTEGER NULL,"+
        "unit TEXT NULL,"+
        "updatedon TEXT NOT NULL,"+
        "createdon DATETIME DEFAULT CURRENT_TIMESTAMP"+
      ")",
      "CREATE TABLE IF NOT EXISTS customers ("+
        "id INTEGER PRIMARY KEY,"+
        "name TEXT NOT NULL,"+
        "phone TEXT NULL UNIQUE,"+
        "email TEXT NULL UNIQUE,"+
        "updatedon TEXT NOT NULL,"+
        "createdon DATETIME DEFAULT CURRENT_TIMESTAMP"+
      ")",
    ];
    return tables;
  }

}

const browserDBInstance = (db) => {

  return {
    executeSql: (sql) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(sql, [], (tx, rs) => {
            resolve(rs)
          });
        });
      })
    },
    sqlBatch: (arr) => {
      return new Promise((r, rr) => {
        let batch = [];
        db.transaction((tx) => {
          for (let i = 0; i < arr.length; i++) {
            batch.push(new Promise((resolve, reject) => {
              tx.executeSql(arr[i], [], () => { resolve(true) })
            }))
            Promise.all(batch).then(() => r(true));
          }
        });
      })
    }
  }
}