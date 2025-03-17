const mongoose = require("mongoose");

// mongoose.connect(`mongodb://localhost:27017/chatting-app`)
mongoose.connect(`mongodb+srv://bhaumik:bhaumik-2217@chatting-application.et4nh.mongodb.net/`)
    // mongoose.connect(`mongodb+srv://sachin:sachin%4025@studentportal.z5okf.mongodb.net/`)
    // mongoose.connect(`mongodb://localhost:27017/`)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err));