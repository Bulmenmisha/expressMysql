import mysql from 'mysql2/promise';

// Параметры подключения к базе product_db.
// ВАЖНО: впиши свой пароль от MySQL.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_MYSQL_PASSWORD',
  database: 'product_db',
  decimalNumbers: true, // DECIMAL (price) возвращать как число, а не строку
});

export default pool;
