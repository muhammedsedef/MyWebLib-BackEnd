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
    authorID: {
        type: String,
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
