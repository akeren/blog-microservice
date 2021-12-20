const { Router } = require('express');
const { store, index } = require('../controllers/comment.controller');

const router = Router();

router.route('/:id/comments').get(index).post(store);

module.exports = router;