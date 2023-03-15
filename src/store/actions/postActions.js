export const getPosts = async () => {
    try {
        const res = await fetch('http://localhost:3900/posts');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};