export const getCurrentpostsToUser = (userId, posts) => {
    let currentPosts = [];

    posts.find((post) => {
        if (userId == post.userId) {
            currentPosts.push(post);
        }
    });

    return currentPosts;
};
