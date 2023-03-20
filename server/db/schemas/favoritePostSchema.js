import mongoose from "mongoose";

const FavoritePostSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const FavoritePostModel = mongoose.model("FavoritePost", FavoritePostSchema);

export default FavoritePostModel;