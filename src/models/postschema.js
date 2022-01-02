const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    content:   String,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
});
module.exports=mongoose.model("Post",postSchema);