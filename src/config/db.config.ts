import mysql from 'mysql';

export const pool = mysql.createPool(({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  database: "test"
}))

pool.getConnection((err, conn) => {
  if(err) throw err;
  console.log(`database successfully connected!`);
})