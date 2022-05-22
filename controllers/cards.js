const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
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
  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Поля заполнены неверно' });
      }
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        console.log(res)
        console.log(card)
        return res.status(400).send({ message: 'Ошибка. Такой карточки не существует' });
      }
      return res.send(card);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
