import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const FavoritePostSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const UserSchema = new mongoose.Schema({
    name: { type: String },
    login: { type: String },
    password: { type: String },
    postsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    postsUpdated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [CommentSchema],
    favoritePosts: [FavoritePostSchema]
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
