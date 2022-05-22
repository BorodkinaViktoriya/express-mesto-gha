const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

/*
PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки
DELETE /cards/:cardId
*/


module.exports = router;

