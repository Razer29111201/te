import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'selling_flower'
})
export default pool



// import mysql from 'mysql2/promise';
// const pool = mysql.createPool({
//     host: 'db4free.net',
//     user: 'selling_flower',
//     password: 'Viet29112001',
//     port: 3306,
//     database: 'selling_flower'
// })
// export default pool