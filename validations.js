import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5-и символов').isLength({min: 5}),
    body('userName', 'Укажите имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи длиннее 3-ех символов').isLength({min: 3}).isString(),
    body('text', 'Текст статьи должен быть длинной не менее 10-и символов').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов (должен быть массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
