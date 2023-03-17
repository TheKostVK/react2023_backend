import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Typography, Divider, Skeleton, Empty} from "antd";
import moment from "moment";

const {Title} = Typography;

export const PostPage = () => {
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [postError, setPostError] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        const getPost = async () => {
            try {
                if (id.length > 0) {
                    const postResponse = await fetch(`http://localhost:3900/post/${id}`);
                    const postData = await postResponse.json();
                    if (postData.success && typeof postData.post === "object") {
                        setPost(postData.post);
                        setLoading(false);
                    }
                }
            } catch (error) {
                setPostError(true);
            }
        };

        getPost();
    }, [id]);

    return (
        <div style={{margin: 20, textAlign: "center"}}>
            {isLoading && (
                <>
                    {postError ? (
                        <>
                            <Empty style={{margin: 20}}/>
                            <div style={{color: "red"}}>{`Пост не найден`}</div>
                            <Link className="button-main" to="/posts" style={{textDecoration: 'none'}}>Вернуться к постам</Link>
                        </>
                    ) : (
                        <>
                            <div>
                                <Title level={1}>
                                    <Skeleton.Input active/>
                                </Title>
                                <Divider style={{fontSize: 12}}>
                                    <Skeleton.Input active/>
                                </Divider>
                            </div>
                            <div>
                                <Skeleton/>
                            </div>
                        </>
                    )}
                </>
            )}
            {!isLoading && post?.title && post?.short_desc && post?.full_desc && (
                <>
                    <div>
                        <Title level={1}>
                            {post.title}
                        </Title>
                    </div>
                    <div>
                        <Divider style={{fontSize: 12}}>
                            {moment(post.create_date).format("DD.MM.YY HH:m:ss")}
                        </Divider></div>
                    <div>
                        <Title level={5} style={{textAlign: "justify", margin: 10, fontSize: 18}}>
                            {post.full_desc}
                        </Title>
                    </div>
                </>
            )}
        </div>
    );
};
