import './App.css';
import './mycss.css';
import {HelloWorld, MainNavBar} from './components/';
import {Card} from 'antd';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <MainNavBar>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/hello/:id' element={<HelloWorld />} />
                <Route path='*' element={<NotFoundError />} />
            </Routes>
            <div></div>
        </MainNavBar>
    );
}


const HomePage = () => {
    // Состояния для списка пользователей, постов пользователя и кнопки
    const [users, setUsers] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [usersButtonLabel, setUsersButtonLabel] = useState('Получить список пользователей');


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
    };


    // Функция, которая вызывается при нажатии на кнопку "Получить список пользователей"
    const handleGetUsers = async () => {
        try {
            // Получаем список пользователей и их постов
            await getUsersAndPosts();
            // Обновляем надпись на кнопке
            setUsersButtonLabel('Обновить список пользователей');
        } catch (error) {
            console.error('Ошибка получения списка пользователей: ',error);
        }
    };


    // Функция для форматирования даты
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('ru-RU').format(date);
    };


    return(
        <div>
            <h1 style={{margin: 15}}>Список пользователей:</h1>
            <button style={{margin: 15}} className="button-main" type="button" onClick={handleGetUsers}>
                {usersButtonLabel}
            </button>
            {usersButtonLabel !== 'Получить список пользователей' && (
                <p style={{margin: 15}}>
                    Дата последнего обновления: <strong
                    className="subsection-performance-headline">{formatDate(new Date())}</strong>
                </p>
            )}
            <div>
                {users.map((user) => {
                    const userPostList = userPosts.filter((post) => post.userId === user.id);
                    return (
                        <Card style={{margin: 15}} title={user.name} key={user.id}>
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
                                                headStyle={{background: 'black', color: '#fff'}}
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
                    );
                })}
            </div>
        </div>
    )
}


const NotFoundError = () => {
    const message = `Запрошенная страница не существует.`;
    const error = new Error(message);
    error.statusCode = 404;
    return (
        <div>
            <h1>404 Page not found</h1>
            <p>Запрошенная страница не существует.</p>
        </div>
    );
};


export default App;