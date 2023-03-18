import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Typography, Divider, Skeleton, Modal, Row, Col, Result, Form, Input, Image} from "antd";
import {ExclamationCircleFilled} from '@ant-design/icons';
import moment from "moment";
import {ButtonUI} from "../UI/ButtonUI/ButtonUI";
import {updatePost} from "../../store/actions/postActions";

const {Title, Text} = Typography;

export const PostPage = () => {
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [postError, setPostError] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedPost, setEditedPost] = useState({
        title: '',
        short_desc: '',
        full_desc: '',
        lastUpdate_date: '',
        userUpdate: '',
    });
    const {id} = useParams();
    const {confirm} = Modal;


    const showConfirm = () => {
        confirm({
            title: 'Вы точно хотите внести изменения в этот пост?',
            icon: <ExclamationCircleFilled/>,
            content: 'После сохранения изменения уже нельзя будет откатить!',
            okText: 'Продолжить',
            cancelText: 'Назад',
            onOk() {
                setShowEditForm(!showEditForm)
            },
            onCancel() {

            },
        });
    };

    const saveEditConfirm = () => {
        confirm({
            title: 'Вы точно хотите сохранить внесенные изменения в этот пост?',
            icon: <ExclamationCircleFilled/>,
            content: 'После сохранения изменения уже нельзя будет откатить!',
            okText: 'Сохранить',
            cancelText: 'Назад',
            onOk() {
                setShowEditForm(!showEditForm)
                setPost(editedPost)
                updatePostMethod()
            },
            onCancel() {

            },
        });
    };


    const updatePostMethod = () => {
        updatePost(id, editedPost)
    }


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


    useEffect(() => {
        setEditedPost(prevState => ({
            ...prevState,
            title: post.title || '',
            short_desc: post.short_desc || '',
            full_desc: post.full_desc || '',
            teg_desc: post.teg_desc || '',
            url_mainImg: post.url_mainImg || '',
            create_date: post.create_date || '',
            userCreate: post.userCreate || '',
            lastUpdate_date: new Date() || '',
            userUpdate: post.userUpdate || '',
        }));
    }, [post]);


    return (
        <div style={{margin: 20, textAlign: "center"}}>
            {isLoading && (
                <>
                    {postError ? (
                        <Result
                            status="404"
                            title="404"
                            subTitle={`Пост не найден`}
                            extra={
                                <ButtonUI type={"primary"} className={"ant-btn-primary ant-btn"} to={"/posts"}
                                          style={{textDecoration: 'none', marginTop: 15}} label={"Вернуться к постам"}/>
                            }
                        />
                    ) : (
                        <div style={{margin: 10}}>
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
                        </div>
                    )}
                </>
            )}
            {!isLoading && !showEditForm ? (
                <div style={{margin: 10}}>
                    {post.url_mainImg ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginBottom: 20
                        }}>
                            <Image
                                style={{objectFit: 'cover', borderRadius: 5}}
                                preview={false}
                                height={'100%'}
                                width={272}
                                alt="logo"
                                src={post.url_mainImg}
                            />
                            <Title level={1}>
                                {post.title}
                            </Title>
                        </div>
                    ) : (
                        <Title level={1}>
                            {post.title}
                        </Title>
                    )}
                    <Row size="small">
                        {post?.create_date && (
                            <Col span={12} style={{textAlign: "left"}}>
                                <Text type="secondary">Дата публикации: </Text>
                                {moment(post.create_date).format("DD.MM.YYYY HH:m")}
                            </Col>
                        )}
                        {post?.userCreate && (
                            <Col span={12} style={{textAlign: "right"}}>
                                <Text type="secondary">Автор: </Text>
                                {post.userCreate}
                            </Col>
                        )}
                    </Row>
                    <div>
                        <Divider style={{marginBottom: 30}}/>
                    </div>
                    <div>
                        <Title level={5}
                               style={{textAlign: "justify", fontSize: 18, whiteSpace: "pre-line"}}>
                            {post.full_desc}
                        </Title>
                    </div>
                </div>
            ) : (!isLoading && showEditForm && (
                    <Form style={{margin: 10}}>
                        <Form.Item>
                            <Input value={editedPost.title}
                                   onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                                   placeholder="Заголовок поста"/>
                        </Form.Item>
                        <Form.Item>
                            <Input value={editedPost.teg_desc}
                                   onChange={(e) => setEditedPost({...editedPost, teg_desc: e.target.value})}
                                   placeholder="Теги"/>
                        </Form.Item>
                        <Form.Item>
                            <Input value={editedPost.url_mainImg}
                                   onChange={(e) => setEditedPost({...editedPost, url_mainImg: e.target.value})}
                                   placeholder="Ссылка на главное фото поста"/>
                        </Form.Item>
                        <Divider style={{marginBottom: 30}}/>
                        <Form.Item>
                            <Input.TextArea rows={4} value={editedPost.short_desc} showCount={true}
                                            onChange={(e) => setEditedPost({
                                                ...editedPost,
                                                short_desc: e.target.value
                                            })}
                                            placeholder="Краткое описание"/>
                        </Form.Item>
                        <Divider style={{marginBottom: 30}}/>
                        <Form.Item>
                            <Input.TextArea rows={20} value={editedPost.full_desc} showCount={true}
                                            onChange={(e) => setEditedPost({
                                                ...editedPost,
                                                full_desc: e.target.value
                                            })}
                                            placeholder="Текс поста"/>
                        </Form.Item>
                        <Divider style={{marginBottom: 30}}/>
                        <Form.Item>
                            <ButtonUI size={'large'} type="primary" label={"Сохранить изменения"}
                                      onClick={saveEditConfirm}/>
                        </Form.Item>
                    </Form>
                )
            )}
            {!isLoading && !showEditForm &&
                <>
                    <Divider style={{marginTop: 30}}/>
                    <Row size="small" style={{marginBottom: 20}}>
                        {post?.create_date && (
                            <Col span={12} style={{textAlign: "left"}}>
                                <Text type="secondary">Последнее обновление: </Text>
                                {moment(post.lastUpdate_date).format("DD.MM.YYYY HH:m")}
                            </Col>
                        )}
                        {post?.userCreate && (
                            <Col span={12} style={{textAlign: "right"}}>
                                <Text type="secondary">Внес правки: </Text>
                                {post.userUpdate}
                            </Col>
                        )}
                    </Row>
                    <ButtonUI size={'large'} style={{marginTop: 10, marginBottom: 10}} type="primary"
                              label={"Редактировать пост"} onClick={showConfirm}/>
                </>
            }
        </div>
    );
};
