export const getCurrentPostsToUser = (userId, posts) => {
    let currentPosts = [];

    posts.find((post) => {
        if (userId === post.userId) {
            currentPosts.push(post);
        }
    });

    return currentPosts;
};

export const getCurrentPostsToUserNEW = (userId, posts) => {
    const currentPosts = posts.filter(post => post.userId === userId);
    return currentPosts;
};
