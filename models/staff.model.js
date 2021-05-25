const mongoose = require('mongoose');

var staffSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: 'This field is required!',
    },
    phonenumber: {
        type: Number,
        required: 'This field is required!',
    },
    email: {
        type: String,
        required: 'This field is required!',
    },

    city: {
        type: String,
        required: 'This field is required!',
    },
});

mongoose.model("staff", staffSchema);