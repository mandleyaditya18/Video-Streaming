const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Movie', MovieSchema);