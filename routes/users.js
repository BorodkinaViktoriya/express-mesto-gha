const router = require('express').Router();

router.get('/users/:id', (req, res) => {
  if (!users[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }

  const { name, age } = users[req.params.id];

  res.send(`Пользователь ${name}, ${age} лет`);
});

router.get('/users/:id', (req, res) => {
  const {id} = req.params;
  const user = users.find((user) => user.id === +id);

  if (!user) {
    return res.status(404).send({
      message:
        'Такого пользователя не существует',
    });
  }
  res.send(user);
  res.status(200).send(user);
  /* GET /users/:userId - возвращает пользователя по _id */
  /* Если отправить запрос на адрес "http://localhost:3000/users/123",
   внутри объекта req.params окажется JSON-объект:
   { "id": "123" } */
});

router().post('/users', (req, res) => {
  const {name, about, avatar} = req.body;
  if (!name || !about || !avatar) {
    return res.status(400).send({message: 'name or about or avatar are not correct'})
  }
  res.status(200).send(req.params);
  /* POST /users — создаёт пользователя */
  /* Если отправить запрос на адрес "http://localhost:3000/users/123",
   внутри объекта req.params окажется JSON-объект:
   { "id": "123" } */
});

module.exports.UserRouter = router;