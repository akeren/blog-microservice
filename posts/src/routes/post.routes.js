const { Router } = require('express');
const { store, index } = require('../controllers/post.controller');

const router = Router();

router.route('/')
    .get(index)
    .post(store);

module.exports = router;