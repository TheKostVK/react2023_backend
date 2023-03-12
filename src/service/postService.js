export const getCurrentPostsToUser = (userId, posts) => {
    const currentPosts = posts.filter(post => post.userId === userId);
    return currentPosts;
};
