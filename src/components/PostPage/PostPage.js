import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider, Skeleton } from "antd";
import moment from "moment";

const { Title, Paragraph } = Typography;

export const PostPage = () => {
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();

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
                console.error("Ошибка получения данных: ", error);
            }
        };

        getPost();
    }, [id]);

    return (
        <div style={{ margin: 20, textAlign: "center" }}>
            {isLoading && (
                <>
                    <div>
                        <Title level={1}>
                            <Skeleton.Input active />
                        </Title>
                        <Divider style={{ fontSize: 12 }}>
                            <Skeleton.Input active />
                        </Divider>
                    </div>
                    <div>
                        <Skeleton />
                    </div>
                </>
            )}
            {!isLoading && post?.title && post?.short_desc && post?.full_desc && (
                <>
                    <div>
                        <Title level={1}>{post.title}</Title>
                        <Divider style={{ fontSize: 12 }}>
                            {moment(post.create_date).format("DD.MM.YY HH:m:ss")}
                        </Divider>
                    </div>
                    <div>
                        <Paragraph>{post.full_desc}</Paragraph>
                    </div>
                </>
            )}
        </div>
    );
};
