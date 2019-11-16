const path = require('path')
const exec = require('child_process').exec

const SQL_FILE_PATH = path.resolve(__dirname, "../db/just_todo_it_db.sql")

const resetDB = () => {
  return new Promise((resolve, reject) => {
    exec(`psql -f ${SQL_FILE_PATH}`, (err, stdout, stderr) => {
      if (err) {
        console.error('ERR =>', err);
        reject(err);
      } else if (stderr) {
        // console.log('STDER =>', stderr);
      }
      resolve(stdout)
    })
  })
}

module.exports = resetDB

resetDB()
