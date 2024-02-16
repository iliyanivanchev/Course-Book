const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddlewares');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtil');

router.get('/create', isAuth, (req, res) => {
    res.render('courses/create')
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    const userId = req.user._id;

    try {
        await courseService.create(userId, courseData);
        res.redirect('/courses/catalog');
    } catch (err) {
        res.render('courses/create', { ...courseData, error: getErrorMessage(err) });
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const courses = await courseService.getAll().lean();
        res.render('courses/catalog', { courses });
    } catch (err) {
        res.render('courses/catalog', { error: getErrorMessage(err) });
    }
});

module.exports = router;