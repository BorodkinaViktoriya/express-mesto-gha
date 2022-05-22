const router = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('', getUsers);
router.get('/:id', getUser);
router.post('', createUser);

/*PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар*/


module.exports = router;
