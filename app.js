const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb');

const app = express();
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (_, res) => res.status(404).send({ message: 'Страница не найдена' }));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
