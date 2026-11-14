# ДЗ 6: Express сервер + MySQL

## Подготовка
1. Создай базу в MySQL (Workbench или терминал):
   ```sql
   CREATE DATABASE product_db;
   ```
2. В `db.js` впиши свой пароль от MySQL.
3. Установи зависимости и создай таблицу:
   ```bash
   npm install
   node setup.js
   ```

## Запуск
```bash
node index.js
```

## Проверка
```bash
curl http://localhost:3000/                       # Hello, World!
curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{"a":1}'
curl -X POST http://localhost:3000/               # 400, пустое тело
curl http://localhost:3000/wrong                  # 404

curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name":"Phone","price":499.99}'
curl http://localhost:3000/products
```
