const router = require('express').Router();
const { isAuth, isGuest } = require('../middlewares/authMiddlewares');
const courseServices = require('../services/courseService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    
    const latestThreeCourses = await courseServices.getLatest().lean();

    res.render('home', { latestThreeCourses });
});

router.get('/profile', isAuth, async (req, res) => {
    const userId = req.user._id;
    const user = await userService.getUser(userId).lean();
    const createdCoursesLength = user.createdCourses?.length || 0;
    const signedUpCoursesLength = user.signedUpCourses?.length || 0;
    console.log(user.signedUpCourses);

    res.render('profile', { ...user, createdCoursesLength, signedUpCoursesLength});
})

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;