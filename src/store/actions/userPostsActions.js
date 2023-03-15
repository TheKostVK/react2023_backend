export const getUserPosts = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
        throw new Error(`Ошибка при загрузке постов пользователя: ${userId}`);
    }
    return await response.json();
};
