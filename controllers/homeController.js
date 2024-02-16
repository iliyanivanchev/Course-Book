const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlewares');

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;