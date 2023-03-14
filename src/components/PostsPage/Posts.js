import React, {useEffect, useState} from "react";
import moment from "moment";
import {Card, Skeleton} from 'antd';
import {ButtonUI} from "../index";
import {useNavigate} from "react-router-dom";

export const Posts = () => {
    const navigation = useNavigate()
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const postsResponse = await fetch('http://localhost:3900/posts');
            const postsData = await postsResponse.json();

            if (postsData.success && Array.isArray(postsData.posts) && postsData.posts.length > 0) {
                setPosts(postsData.posts);
                setLoading(false);
            }
        } catch (error) {
            console.error('Ошибка получения данных: ', error);
        }
    };

    const goToPost = (id = '') => {
        if (id.length > 0) {
            navigation(`/post/${id}`)
        }
    }

    return (
        <>
            {isLoading && (
                <>
                    <Card title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                        <Skeleton active/>
                    </Card>
                    <Card title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                        <Skeleton active/>
                    </Card>
                </>
            )}
            {!isLoading && posts && Array.isArray(posts) && (
                <>
                    {posts.map((item) => {
                        return (
                            <Card key={item._id} title={item.title} bordered={false}
                                  style={{margin: 20}}>
                                <p>{item.short_desc}</p>
                                <p>{item.full_desc}</p>
                                <p>{moment(item.create_date).format('DD.MM.YY HH:m:ss')}</p>
                                <ButtonUI label={'Открыть'} onClick={() => goToPost(item._id)}/>
                            </Card>
                        );
                    })}
                </>
            )}
        </>
    );

};