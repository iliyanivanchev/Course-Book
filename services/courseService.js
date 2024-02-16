const Course = require('../models/Course');
const User = require('../models/User');

exports.getAll = () => Course.find();

exports.create = async (userId, courseData) => {
    const createdCourse = await Course.create({
        owner: userId,
        ...courseData,
    });

    await User.findByIdAndUpdate(userId, {$push: {createdCourses: createdCourse._id}});

    return createdCourse;
};