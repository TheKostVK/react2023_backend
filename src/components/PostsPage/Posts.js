import React, {useEffect, useState} from "react";
import {Card} from 'antd';

export const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const usersResponse = await fetch('http://localhost:3900/posts');
            const postsData = await usersResponse.json();

            if (postsData.success && Array.isArray(postsData.posts) && postsData.posts.length > 0) {
                setPosts(postsData.posts);
            }
        } catch (error) {
            console.error('Ошибка получения данных: ', error);
        }
    };

    return (
        <>
            {posts && Array.isArray(posts) && (
                <>
                    {posts.map((item) => {
                        return (
                            <Card title={item.title} bordered={false}
                                  style={{margin: 20}}>
                                <p>{item.short_desc}</p>
                                <p>{item.full_desc}</p>
                                <p>{new Date(item.create_date).toUTCString()}</p>
                            </Card>
                        );
                    })}
                </>
            )}
        </>
    );

};