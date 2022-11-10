const mysql = require('mysql')

const openConnection = () => {
  const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'd1',
  })

  connection.connect()

  return connection
}


module.exports = {
  openConnection
}
