const mongoose = require('mongoose');


const MemberSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    follow: {
        type: [{

            userID: {
                type: String,
                required: true
            },
            followDate: {
                type: Date,
                default: Date.now
            }
        }]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Members', MemberSchema);
