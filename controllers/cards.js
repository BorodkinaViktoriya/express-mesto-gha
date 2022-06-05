const Card = require('../models/card');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  if (!name || !link) {
    throw new BadRequestError(' Переданы некорректные данные при создании карточки.');
  }
  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(' Переданы некорректные данные при создании карточки.'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Чужужю карточку нельзя удалять.');
      }
      card.remove();
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return new BadRequestError('Передано некорректное id карточки.');
      }
      return next(err);
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, {
    new: true,
  })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          message:
            'Переданы некорректные данные для постановки/снятия лайка.',
        });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, {
    new: true,
  })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          message:
            'Переданы некорректные данные для постановки/снятия лайка.',
        });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
