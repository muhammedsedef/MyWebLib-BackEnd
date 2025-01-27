const mongoose = require('mongoose');

const PostSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    authorID: {
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date
    }
});

module.exports = mongoose.model('Posts', PostSchema);
