import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: { type: String, default: "DEFAULT TITLE" },
    short_desc: { type: String },
    full_desc: { type: String },
    create_date: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;