const path = require('path');
const sqlite = require('sqlite3');

class Database {
  constructor(name){
    this.db = new sqlite.Database(name);
  }

  getAll(name){
    return new Promise((resolve,reject)=>{
      let sql = `SELECT * FROM ${name}`;
      this.db.all(sql,(err,rows)=>{
        if(err) return reject(err);
        resolve(rows);
      })
    })
  }

  search(table,search){
    return new Promise((resolve,reject)=>{
      let sql =  `SELECT * FROM ${table} WHERE ${search.name} LIKE '%${search.value}'`;
      this.db.all(sql,(err,rows)=>{
        if(err) return reject(err);
        resolve(rows);
      })
    })
  }
}

module.exports = Database;

// let db = new Database(path.join(__dirname,'dictionary.db'));



