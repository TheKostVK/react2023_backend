import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const PostPage = () => {
    const navigation = useNavigate();
    const [post, setPost] = useState({});
    const params = useParams();

    const {id} = params;

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            if (id.length > 0) {
                const postResponse = await fetch(`http://localhost:3900/post/${id}`);
                const postData = await postResponse.json();

                if (postData.success && typeof postData.post == 'object') {
                    setPost(postData.posts);
                }
            }
        } catch (error) {
            console.error('Ошибка получения данных: ', error);
        }
    };

    return (
        <div style={{margin: 20, textAlign: 'center'}}>PostPage</div>
    )
}