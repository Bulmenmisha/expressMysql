import pool from './db.js';

// Создаём таблицу products (если её ещё нет)
const createTableSql = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
  )
`;

try {
  await pool.query(createTableSql);
  console.log('Таблица products создана (или уже существовала)');
} catch (error) {
  console.error('Ошибка при создании таблицы:', error.message);
} finally {
  await pool.end();
}
