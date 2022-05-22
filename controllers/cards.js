const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  if (!name || !link) {
    return res.status(400).send({ message: 'Поля заполнены неверно' });
  }
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        return res.status(400).send({ message: 'Поля заполнены неверно' });
      }
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
};


const deleteCard = (req, res) => {
  /*User.findById(req.params.id)
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
      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          message:
            'Неверный id пользователя',
        });*!/
     }
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });*/
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
