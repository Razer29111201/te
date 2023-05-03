import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,

    database: 'selling_flower'
})
export default pool
