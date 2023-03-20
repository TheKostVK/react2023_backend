import './App.css';
import './mycss.css';
import {ButtonUI, MainNavBar, PostPage, Posts} from './components/';
import {Result, List, Avatar, Skeleton, Divider} from 'antd';
import {useState, useEffect} from "react";
import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Title from "antd/es/typography/Title";
import InfiniteScroll from 'react-infinite-scroll-component';


function App() {
    return (
        <MainNavBar>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/post/:id' element={<PostPage/>}/>
                <Route path='*' element={<NotFoundError/>}/>
            </Routes>
        </MainNavBar>
    );
}


function HomePage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);


    return (
        <>
            <Title level={1} style={{textAlign: "center"}}>Главная</Title>
            <div>здесь был текст</div>
            <p>
                Тут будут показаны последние комментарии и посты, а так же пользователи которые зарегистрировались
                недавно))
            </p>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large}/>}
                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                    description={item.email}
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
};


const NotFoundError = () => {
    const {pathname} = useLocation();
    const message = `Запрошенная страница не существует ошибка при получении информации с URL: ${pathname}`;
    const error = new Error(message);
    error.statusCode = 404;
    return (
        <Result
            status="404"
            title="404"
            subTitle={message}
            extra={
                <ButtonUI type={"primary"} className={"ant-btn-primary ant-btn"} to={"/"}
                          style={{textDecoration: 'none'}}
                          label={"Вернуться на главную"}/>
            }
        />
    );
};


export default App;
