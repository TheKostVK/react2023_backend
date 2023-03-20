import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;