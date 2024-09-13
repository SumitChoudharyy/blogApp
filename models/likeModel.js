// Import Mongoose
const mongoose = require("mongoose");

// Route Handler
const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", //reference to the Post model
    },
    user:{
        type: String,
        required: true,
    },
});


// export
module.exports = mongoose.model("Like", likeSchema);