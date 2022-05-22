const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message:
            'Такого пользователя не существует',
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind == 'ObjectId') {
        return res.status(400).send({
          message:
            'Неверный id пользователя',
        });
      }
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    return res.status(400).send({ message: 'Поля заполнены неверно' });
  }
  User.create(name, about, avatar)
    .then((user) => {
      res.status(200).send({ message: 'Пользователь успешно создан' });
    });

  /* POST /users — создаёт пользователя */
  /* Если отправить запрос на адрес "http://localhost:3000/users/123",
   внутри объекта req.params окажется JSON-объект:
   { "id": "123" } */
});

module.exports.userRouter = router;
