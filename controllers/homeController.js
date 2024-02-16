const router = require('express').Router();
const courseServices = require('../services/courseService');

router.get('/', async (req, res) => {
    
    const latestTreeCourses = await courseServices.getLatest().lean();

    res.render('home', { latestThreeCourses });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;