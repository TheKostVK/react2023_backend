import express from "express";
import userSchema from "../db/schemas/userSchema.js";
import favoritePostSchema from "../db/schemas/favoritePostSchema.js";
import commentSchema from "../db/schemas/commentSchema.js";

const router = express.Router();


// Обработчик POST-запроса на регистрацию нового пользователя
router.post('/register', async (req, res, next) => {
    try {
// Получаем данные, переданные от клиента
        const { name, login, password } = req.body;

        // Добавляем нового пользователя в базу данных
        const newUser = await userSchema.create({ name, login, password });

        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: 'Пользователь зарегистрирован',
            user: newUser
        };

        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});

// Обработчик POST-запроса на вход пользователя
router.post('/login', async (req, res, next) => {
    try {
// Получаем данные, переданные от клиента
        const { login, password } = req.body;

        // Ищем пользователя в базе данных
        const user = await userSchema.findOne({ login, password });

        if (user) {
            // Формируем ответ для клиента
            const responseObj = {
                success: true,
                message: 'Авторизация прошла успешно',
                user: user
            };

            // Отправляем ответ клиенту
            res.status(200).json(responseObj);
        } else {
            // Формируем ответ для клиента
            const responseObj = {
                success: false,
                message: 'Пользователь отсутствует'
            };

            // Отправляем ответ клиенту
            res.status(400).json(responseObj);
        }
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});

// Обработчик GET-запроса на получение информации о текущем пользователе
router.get('/user/:id', async (req, res, next) => {
    try {
// Получаем идентификатор пользователя из параметров запроса
        const { id } = req.params;

        // Ищем пользователя в базе данных
        const user = await userSchema.findById(id);

        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            user: user
        };

        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }

});


// Обработчик GET-запроса на получение всех пользователей
router.get('/users', async (req, res, next) => {
    try {
        // Получаем всех пользователей из базы данных
        const users = await userSchema.find({});
        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            users: users || []
        };
        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});

// Обработчик GET-запроса на получение комментариев пользователя
router.get('/users/:id/comments', async (req, res, next) => {
    try {
        // Извлекаем идентификатор пользователя из параметров запроса
        const { id } = req.params;

        // Получаем комментарии пользователя из базы данных
        const user = await userSchema.findById(id).populate('comments');

        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            comments: user.comments || []
        };

        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});

// Обработчик GET-запроса на получение избранных постов пользователя
router.get('/users/:id/favorite-posts', async (req, res, next) => {
    try {
        // Извлекаем идентификатор пользователя из параметров запроса
        const { id } = req.params;

        // Получаем избранные посты пользователя из базы данных
        const user = await userSchema.findById(id).populate('favoritePosts');

        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            favoritePosts: user.favoritePosts || []
        };

        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});


// Обработчик POST-запроса на добавление комментария
router.post('/users/:id/comments', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { text, postId } = req.body;

        // Создаем новый комментарий
        const comment = new commentSchema({
            text,
            postId
        });

        // Добавляем комментарий в базу данных и обновляем информацию о пользователе
        const updatedUser = await userSchema.findByIdAndUpdate(
            id,
            { $push: { comments: comment } },
            { new: true }
        ).populate('comments');

        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: 'Комментарий успешно добавлен',
            comment,
            user: updatedUser
        };

        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});


// Обработчик POST-запроса на добавление поста в избранное
router.post('/users/:id/favorites', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { postId } = req.body;

        // Создаем новую запись в избранном
        const favoritePost = new favoritePostSchema({
            postId
        });

        // Добавляем запись в избранное в базу данных и обновляем информацию о пользователе
        const updatedUser = await userSchema.findByIdAndUpdate(
            id,
            { $push: { favoritePosts: favoritePost } },
            { new: true }
        ).populate('favoritePosts.postId');

        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: 'Пост успешно добавлен в избранное',
            favoritePost,
            user: updatedUser
        };

        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});
