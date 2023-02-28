import React, { useState } from 'react';

const Login = () => {
    const [inviteCode, setInviteCode] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Проверяем пригласительный код
        if (inviteCode === 'myinvitecode') {
            // Устанавливаем флаг, что пользователь залогинен
            setIsLoggedIn(true);
        } else {
            alert('Неверный пригласительный код');
        }
    };

    const handleLogout = () => {
        // Сбрасываем состояние при выходе из учетной записи
        setInviteCode('');
        setIsLoggedIn(false);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <h2>Авторизация</h2>
                    <input type="text" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />
                    <button onClick={handleLogin}>Войти</button>
                </div>
            ) : (
                <div>
                    <h2>Привет, пользователь!</h2>
                    <button onClick={handleLogout}>Выйти</button>
                </div>
            )}
        </div>
    );
};

export default Login;
