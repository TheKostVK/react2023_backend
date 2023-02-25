import './App.css';
import './mycss.css';
import {Card, Row} from 'antd'
import React, {useState} from "react";


// Функциональный компонент - четкий, модный, молодежный
function App1() {
    const [users, setUsers] = useState([])
    const [userPosts, setPosts] = useState([])
    const [usersButtonTEXT, setUsersButtonTEXT] = useState(['Получить список пользователей'])

    // Обновляет текст на кнопке получения списка пользователей
    const updateButtonTEXT = (updateTEXT) => {
        setUsersButtonTEXT(updateTEXT)
    }
    // Получение данных по ссылке
    const getData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            // Конвертация в json файл
            .then(res => res.json())
            // Проверка на массив
            .then(res => {
                if (res && Array.isArray(res) && res.length > 0) {
                    setUsers(res)
                }
            })
        // Получение постов
        fetch('https://jsonplaceholder.typicode.com/posts').then(Posts => Posts.json()).then(Posts => {
            if (Posts && Array.isArray(Posts) && Posts.length > 0) {
                setPosts(Posts);
                console.log(Posts)
            }
        })
        // Обновление текста на кнопке
        updateButtonTEXT('Обновить список пользователей');
    }
    const stylesCSS = {
        color: 'red',
        border: '1px solid #000',
        padding: 10,
        margin: 'auto',
        borderRadius: 10,
        marginBottom: 5,
        background: '#ccc'
    }
    const styleDefault = {
        margin: 15
    }
    return (
        <>
            <h1 style={styleDefault}>Список пользователей: </h1>
            <button className='button-main' style={styleDefault} type=""
                    onClick={() => getData()}>{usersButtonTEXT}</button>
            {
                usersButtonTEXT != 'Получить список пользователей' &&
                <p className='subsection-performance-headline'
                   style={styleDefault}>{'Дата последнего обновления: ' + new Date().toLocaleString() + ''}</p>
            }
            <div>
                {users.length > 0 && users.map(user => {
                    return (
                        <Card style={{margin: 15}} title={user.name} key={Math.random()}>
                            <p>
                                <strong>Email: </strong>
                                <strong style={{color: 'red'}}>{user.email}</strong>
                            </p>
                            <p>
                                <strong>Phone: </strong>
                                <strong style={{color: '#6A5ACD'}}>{user.phone}</strong>
                            </p>
                            <p>
                                <strong>Website: </strong>
                                <a href={user.website}>{user.website}</a>
                            </p>
                            <div style={{border: '1px solid #000', borderRadius: 2}}>
                                <Row  style={{margin: 10}} gutter={10}>
                                    {
                                        userPosts.filter(post => post.userId === user.id)
                                            .map(post => {
                                                return (
                                                    <Card title={post.title} style={{margin: 10, width: "100%"}}
                                                          headStyle={{background: 'black', color: '#fff'}}>
                                                        <p>{post.body}</p>
                                                    </Card>
                                                )
                                            }
                                        )
                                    }
                                </Row>
                            </div>
                        </Card>);
                })
                }
            </div>
        </>
    )
}


export default App1;