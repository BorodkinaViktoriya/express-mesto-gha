const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/),
  }),
}), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
