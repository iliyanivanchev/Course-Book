const User = require('../models/User');

exports.getUser = (userId) => User.findById(userId).populate('createdCourses').populate('signedUpCourses');