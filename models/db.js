require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.log("MongoDB Connected");
        } else {
            console.log("Error in connection" + err);
        }
    }
);
require('./staff.model');