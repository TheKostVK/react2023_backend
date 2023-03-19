import React, {useEffect, useState} from "react";
import moment from "moment";
import {Avatar, Card, Image, List, Space, Typography} from 'antd';
import {ButtonUI} from "../index";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../store/actions/postActions";
import {
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    SettingOutlined,
    EllipsisOutlined,
    CodeSandboxCircleFilled
} from "@ant-design/icons";
import {LoadingPostTemplate} from "../LoadingPostTemplate/LoadingPostTemplate";

const {Title} = Typography;
const {Meta} = Card;

export const Posts = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch();
    const {loading, posts} = useSelector((state => state.posts));
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'getPosts_onfetch'});
                const data = await getPosts();
                dispatch({type: 'getPosts_success', posts: data.posts, loading: false, success: true});
            } catch (error) {
                dispatch({type: 'getPosts_failure', errMsg: error.message});
            }
        };
        fetchData();
    }, [dispatch]);


    const goToPost = (id) => {
        navigation(`/post/${id}`)
    }

    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <>
            <Title level={1} style={{textAlign: "center"}}>Посты</Title>
            {loading ? (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <LoadingPostTemplate windowSize={windowSize}/>
                    <LoadingPostTemplate windowSize={windowSize}/>
                </div>
            ) : (
                <>
                    {posts && posts.length > 0 ? (
                        <>
                            <List
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }}
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    pageSize: 3,
                                }}
                                dataSource={posts}
                                renderItem={(post) =>
                                    windowSize > 930 ? (
                                        <List.Item
                                            style={{
                                                width: 905,
                                                marginBottom: 10,
                                                border: "",
                                                borderRadius: 5,
                                                backgroundColor: "white",
                                                height: 280,
                                                overflow: "hidden"
                                            }}
                                            key={post._id}
                                            actions={[
                                                <ButtonUI label={'Читать'} onClick={() => goToPost(post._id)}/>,
                                                <IconText icon={StarOutlined}
                                                          text={Math.floor(Math.random() * 10000)}
                                                          key="list-vertical-star-o"/>,
                                                <IconText icon={LikeOutlined}
                                                          text={Math.floor(Math.random() * 10000)}
                                                          key="list-vertical-like-o"/>,
                                                <IconText icon={MessageOutlined}
                                                          text={Math.floor(Math.random() * 10000)}
                                                          key="list-vertical-message"/>,
                                                <p>{moment(post.create_date).format('DD.MM.YYYY HH:mm')}</p>,
                                            ]}
                                            extra={
                                                post.url_mainImg ? (
                                                    <Image
                                                        style={{objectFit: 'cover', borderRadius: 5}}
                                                        preview={false}
                                                        height={'100%'}
                                                        width={272}
                                                        alt="logo"
                                                        src={post.url_mainImg}
                                                    />
                                                ) : null
                                            }>
                                            <List.Item.Meta
                                                avatar={<CodeSandboxCircleFilled/>}  //<Avatar src={post.avatar}/>
                                                title={<a href={`/post/${post._id}`}>{post.title}</a>}
                                                description={post.teg_desc}
                                            />
                                            <div style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                height: 88,
                                            }}>{post.short_desc}</div>
                                        </List.Item>
                                    ) : (
                                        <Card
                                            style={{minWidth: 250, height: 500, marginBottom: 10}}
                                            cover={post.url_mainImg ? (
                                                <Image
                                                    style={{objectFit: 'cover'}}
                                                    preview={false}
                                                    height={350}
                                                    width={'auto'}
                                                    alt="logo"
                                                    src={post.url_mainImg}
                                                />
                                            ) : null}
                                            actions={[
                                                <SettingOutlined key="setting"/>,
                                                <ButtonUI label={'Читать'} onClick={() => goToPost(post._id)}/>,
                                                <EllipsisOutlined key="ellipsis"/>,
                                            ]}
                                        >
                                            <Meta
                                                avatar={<Avatar src="https://joesch.moe/api/v1/random"/>}
                                                title={post.title}
                                                description={post.teg_desc}
                                            />
                                        </Card>
                                    )
                                }
                            />
                        </>
                    ) : (
                        <>
                            <div>
                                <p style={{margin: 20, color: 'red'}}>
                                    Ошибка загрузки данных, повторите попытку позже
                                </p>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }}>
                                    <LoadingPostTemplate windowSize={windowSize}/>
                                    <LoadingPostTemplate windowSize={windowSize}/>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );

};
