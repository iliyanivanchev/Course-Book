const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, 'Title must be at least 5 character long'],
    },
    type: {
        type: String,
        required: true,
        minLength: [3, 'Type must be at least 3 character long'],
    },
    certificate: {
        type: String,
        required: true,
        minLength: [2, 'Sertificate must be at least 2 character long'],
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description must be at least 10 character long'],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;