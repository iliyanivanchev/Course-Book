const courseService = require('../services/courseService');

async function isCourseOwner(req, res, next) {
    const courseId = req.params.courseId;
    const course = await courseService.getOne(courseId).lean();

    if (course.owner != req.user?._id) {
        return res.redirect(`/courses/${courseId}/details`)
    };
    req.course = course;
    next();
};

exports.isCourseOwner = isCourseOwner;