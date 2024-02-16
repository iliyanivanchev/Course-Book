const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddlewares');
const { isCourseOwner } = require('../middlewares/courseMiddleware');
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

router.get('/:courseId/details', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseService.getOneDetailed(courseId).lean();

    const signUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isOwner = course.owner && course.owner._id == req.user?._id;

    const isSigned = course.signUpList.some(user => user._id == req.user?._id);

    res.render('courses/details', { ...course, signUpUsers, isOwner, isSigned });
});

router.get('/:courseId/sign-up', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    await courseService.signUp(courseId, userId);

    res.redirect(`/courses/${courseId}/details`);
});

router.get('/:courseId/edit', isCourseOwner, async (req, res) => {

    res.render('courses/edit', { ...req.course });
});

router.post('/:courseId/edit', isCourseOwner, async (req, res) => {
    const courseData = req.body;
    const courseId = req.params.courseId;

    try {
        await courseService.edit(courseId, courseData);

        res.redirect(`/courses/${courseId}/details`);
    } catch (err) {
        res.render('courses/edit', { ...courseData, error: getErrorMessage(err) });
    }
});

router.get('/:courseId/delete', isCourseOwner, async (req, res) => {
    const courseId = req.params.courseId;

    await courseService.delete(courseId);

    res.redirect('/courses/catalog');
});

module.exports = router;