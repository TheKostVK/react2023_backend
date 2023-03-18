import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: { type: String, default: "DEFAULT TITLE" },
    short_desc: { type: String },
    full_desc: { type: String },
    teg_desc: {type: String },
    url_mainImg: {type: String },
    create_date: { type: Date, default: Date.now },
    userCreate: { type: String },
    lastUpdate_date: { type: Date, default: "" },
    userUpdate: { type: String },
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;