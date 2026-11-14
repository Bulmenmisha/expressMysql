import express from 'express';
import pool from './db.js';

const app = express();
const PORT = 3000;

// Парсинг JSON в теле запроса
app.use(express.json());

// ---------- Задание 3: GET / и POST / ----------

app.get('/', (req, res, next) => {
  try {
    res.send('Hello, World!');
  } catch (error) {
    next(error);
  }
});

app.post('/', (req, res) => {
  const data = req.body;

  // Проверяем, что данные вообще пришли
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Тело запроса пустое. Отправь JSON.' });
  }

  res.status(201).json({ message: 'Данные получены', data });
});

// ---------- Задание 5: работа с таблицей products ----------

app.get('/products', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/products', async (req, res, next) => {
  const { name, price } = req.body || {};

  if (!name || price === undefined || isNaN(Number(price))) {
    return res.status(400).json({ error: 'Нужны поля name (строка) и price (число)' });
  }

  try {
    // ? — плейсхолдеры, защищают от SQL-инъекций
    const [result] = await pool.query(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [name, price]
    );
    res.status(201).json({
      message: 'Продукт успешно добавлен',
      product: { id: result.insertId, name, price: Number(price) },
    });
  } catch (error) {
    next(error);
  }
});

// ---------- Обработка ошибок ----------

// Неизвестный маршрут (например, неправильный путь)
app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.url} не найден` });
});

// Общий обработчик ошибок (4 аргумента — так Express понимает, что это error handler)
app.use((err, req, res, next) => {
  // Невалидный JSON в теле запроса
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Некорректный JSON' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
