import './App.css';
import './mycss.css';
import {MainNavBar, PostPage, Posts} from './components/';
import {Card, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "./store/actions/usersActions";


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


const HomePage = () => {
    const [userPosts, setUserPosts] = useState([]);
    const dispatch = useDispatch();
    const {loading, success, users} = useSelector((state => state.users));


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'getUsers_onfetch'});
                const data = await getUsers();
                dispatch({type: 'getUsers_success', users: data, loading: false, success: true});
            } catch (error) {
                dispatch({type: 'getUsers_failure', errMsg: error.message});
            }
        };
        fetchData();
    }, [dispatch]);


    // Функция для форматирования даты
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('ru-RU').format(date);
    };


    return (
        <div>
            <h1 style={{margin: 20}}>Список пользователей:</h1>
            <p style={{margin: 20}}>
                Дата последнего обновления:
                <strong className="subsection-performance-headline">{formatDate(new Date())}</strong>
            </p>
            <div>
                {loading ? (
                    <>
                        <Card key='1' title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                            <Skeleton active/>
                        </Card>
                        <Card key='2' title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                            <Skeleton active/>
                        </Card>
                    </>
                ) : (
                    <>
                        {users && users.length > 0 ? (
                            <>
                                {users.map((user) => {
                                    const userPostList = userPosts.filter((post) => post.userId === user.id);
                                    return (
                                        <Card style={{margin: 20}}
                                              headStyle={{background: 'dimgrey', color: '#fff'}}
                                              title={user.name} key={user.id}>
                                            <p>
                                                <strong>Email: </strong>
                                                <strong style={{color: 'red'}}>{user.email}</strong>
                                            </p>
                                            <p>
                                                <strong>Номер телефона: </strong>
                                                <strong style={{color: '#6A5ACD'}}>{user.phone}</strong>
                                            </p>
                                            <p>
                                                <strong>Веб-сайт: </strong>
                                                <a href={user.website}>{user.website}</a>
                                            </p>
                                            <div style={{border: '1px solid #000', borderRadius: 2}}>
                                                <details>
                                                    <summary style={{fontWeight: 'bold', marginBottom: 10}}>
                                                        Посты пользователя
                                                    </summary>
                                                    {userPostList.length > 0 ? (
                                                        userPostList.map((post) => (
                                                            <Card title={post.title} style={{margin: 10}}
                                                                  headStyle={{
                                                                      background: 'dimgrey',
                                                                      color: '#fff'
                                                                  }} key={post.id}>
                                                                <p>{post.body}</p>
                                                            </Card>
                                                        ))
                                                    ) : (
                                                        <p style={{margin: 10}}>Постов нет</p>
                                                    )}
                                                </details>
                                            </div>
                                        </Card>
                                    );
                                })}
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
                )
                }
            </div>
        </div>
    )
}


const NotFoundError = () => {
    const {pathname} = useLocation();
    const message = `Запрошенная страница не существует ошибка при получении информации с URL: ${pathname}`;
    const error = new Error(message);
    error.statusCode = 404;
    return (
        <div style={{margin: 15}}>
            <h1>404 Page not found</h1>
            <p>{message}</p>
            <Link className="button-main" to="/" style={{textDecoration: 'none'}}>Вернуться на главную</Link>
        </div>
    );
};


export default App;
