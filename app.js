const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '628a486650bb1da1f86cad92',
  };
  next();
});

app.use('/users', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
