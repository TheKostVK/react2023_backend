export const getUsers = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
