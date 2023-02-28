export const getCurrentPostsToUser = (userId, posts) => {
    let currentPosts = [];

    posts.find((post) => {
        if (userId === post.userId) {
            currentPosts.push(post);
        }
    });

    return currentPosts;
};
