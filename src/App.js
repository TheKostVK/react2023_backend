import './App.css';
import './mycss.css';
import {MainNavBar, PostPage, Posts} from './components/';
import {Card, Skeleton} from 'antd';
import React, {useState} from 'react';
import {Link, Route, Routes, useLocation} from "react-router-dom";


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
    // Состояния для списка пользователей, постов пользователя и кнопки
    const [users, setUsers] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [usersButtonLabel, setUsersButtonLabel] = useState('Получить список пользователей');
    const [isLoading, setLoading] = useState(false);


    // Функция для получения постов пользователей и списка пользователей
    const getUsersAndPosts = async () => {
        try {
            const [usersResponse, postsResponse] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
            ]);
            const [usersData, postsData] = await Promise.all([
                usersResponse.json(),
                postsResponse.json(),
            ]);
            // Если данные получены, сохраняем их в состояние
            if (Array.isArray(usersData) && usersData.length > 0) {
                setUsers(usersData);
            }
            if (Array.isArray(postsData) && postsData.length > 0) {
                setUserPosts(postsData);
            }
        } catch (error) {
            console.error('Ошибка получения данных: ', error);
        }
        setLoading(false)
    };


    // Функция, которая вызывается при нажатии на кнопку "Получить список пользователей"
    const handleGetUsers = async () => {
        try {
            setLoading(true);
            setUsersButtonLabel('Обновить список пользователей');
            // Получаем список пользователей и их постов
            await getUsersAndPosts();
            // Обновляем надпись на кнопке
        } catch (error) {
            setUsersButtonLabel('Попытаться получить список пользователей еще раз');
            console.error('Ошибка получения списка пользователей: ', error);
        }
    };


    // Функция для форматирования даты
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('ru-RU').format(date);
    };


    return (
        <div>
            <h1 style={{margin: 15}}>Список пользователей:</h1>
            <button style={{margin: 15}} className="button-main" type="button" onClick={handleGetUsers}>
                {usersButtonLabel}
            </button>
            {usersButtonLabel !== 'Получить список пользователей' && (
                <p style={{margin: 15}}>
                    Дата последнего обновления:
                    <strong className="subsection-performance-headline">{formatDate(new Date())}</strong>
                </p>
            )}
            {isLoading && (
                <>
                    <Card key='1' title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                        <Skeleton active/>
                    </Card>
                    <Card key='2' title={<Skeleton.Input active/>} bordered={false} style={{margin: 20}}>
                        <Skeleton active/>
                    </Card>
                </>
            )}
            <div>
                {users.map((user) => {
                    const userPostList = userPosts.filter((post) => post.userId === user.id);
                    return (
                        <>
                            {!isLoading && (
                                <Card style={{margin: 20}} headStyle={{background: 'dimgrey', color: '#fff'}}
                                      title={user.name}
                                      key={user.id}>
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
                                                    <Card
                                                        title={post.title}
                                                        style={{margin: 10}}
                                                        headStyle={{background: 'dimgrey', color: '#fff'}}
                                                        key={post.id}
                                                    >
                                                        <p>{post.body}</p>
                                                    </Card>
                                                ))
                                            ) : (
                                                <p style={{margin: 10}}>Постов нет</p>
                                            )}
                                        </details>
                                    </div>
                                </Card>
                            )}
                        </>
                    );
                })}
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
