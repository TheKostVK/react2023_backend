import './App.css';
import './mycss.css';
import {Card, Row} from 'antd'
import React, {useState} from "react";


// Функциональный компонент - четкий, модный, молодежный
function App1() {
    const [users, setUsers] = useState([])
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
        margin: 10
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
            <div style={{margin: 50}}>
                {users.length > 0 && users.map(user => {
                    return (
                        <Card title={'Name: ' + user.name} key={Math.random()}>
                            <p>
                                <strong>Email: </strong>
                                <strong style={{color: 'red'}}>{user.email}</strong>
                            </p>
                        </Card>);
                })
                }
            </div>
        </>
    )
}


export default App1;