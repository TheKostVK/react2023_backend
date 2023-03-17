export const getPosts = async () => {
    try {
        const res = await fetch('http://localhost:3900/posts');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const getPost = async (id) => {
    try {
        const res = await fetch(`http://localhost:3900/post/${id}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const updatePost = async (id, data) => {
    try {
        const res = await fetch(`http://localhost:3900/post/${id}/update`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};