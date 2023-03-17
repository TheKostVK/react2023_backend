import React, {useEffect} from "react";
import moment from "moment";
import {Card, Skeleton, Typography} from 'antd';
import {ButtonUI} from "../index";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../store/actions/postActions";

const {Title} = Typography;

export const Posts = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch();
    const {loading, posts} = useSelector((state => state.posts));

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

    return (
        <>
            {loading ? (
                <>
                    <Card title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                        <Skeleton active/>
                    </Card>
                    <Card title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                        <Skeleton active/>
                    </Card>
                </>
            ) : (
                <>
                    {posts && posts.length > 0 ? (
                        <>
                            <Title level={1} style={{textAlign: "center"}}>Посты</Title>
                            {posts.map((item) => (
                                <Card key={item._id} title={item.title} bordered={false}
                                      style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                                    <p>{item.short_desc}</p>
                                    <p>{moment(item.create_date).format('DD.MM.YYYY HH:m:s')}</p>
                                    <ButtonUI type={"primary"} label={'Читать'} className={"ant-btn-primary ant-btn"}
                                              style={{textDecoration: 'none'}} onClick={() => goToPost(item._id)}/>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <>
                            <div>
                                <p style={{margin: 20, color: 'red'}}>
                                    Ошибка загрузки данных, повторите попытку позже
                                </p>
                                <Card key='1' title={<Skeleton.Input active/>} bordered={false}
                                      style={{margin: 20}}>
                                    <Skeleton active/>
                                </Card>
                                <Card key='2' title={<Skeleton.Input active/>} bordered={false}
                                      style={{margin: 20}}>
                                    <Skeleton active/>
                                </Card>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );

};
