const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const { UsersRouter } = require('./routes/users');
const { CardRouter } = require('./routes/cards');
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb');

const app = express();
app.use(express.json());

app.use('/', UsersRouter);
app.use('/', CardRouter);
/* app.get('/users', (req, res) => {
  res.status(200).send('Dct jvlkbndsv');
  /!* GET /users — возвращает всех пользователей *!/
}); */

/* router.get('/books', getBooks);
router.post('/books', createBook);
router.put('/books/:id', replaceBook);
router.patch('/books/:id', updateBookInfo);
router.delete('/books/:id', deleteBook); */

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
