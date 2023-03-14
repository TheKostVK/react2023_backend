import express from "express";
import PostSchema from "../db/schemas/postSchema.js";

const router = express.Router();


// Обработчик GET-запроса на получение всех постов
router.get('/posts', async (req, res, next) => {
    try {
        // Получаем все посты из базы данных
        const posts = await PostSchema.find({});
        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            posts: posts || []
        };
        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});


// Обработчик GET-запроса на получение конкретного поста по id
router.get('/post/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        // Находим пост по id в базе данных
        const post = await PostSchema.findOne({ '_id': id });
        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            post: post || []
        };
        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});


// Обработчик POST-запроса на добавление нового поста в базу данных
router.post('/post/add', async (req, res, next) => {
    try {
        // Создаем новый пост в базе данных
        const post = new PostSchema({
            title: 'Hello World',
            short_desc: "Short description",
            full_desc: "Full description",
            create_date: new Date()
        });
        await post.save();
        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            postId: post._id.toString()
        };
        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});


// Обработчик PUT-запроса на обновление поста по id в базе данных
router.put('/post/:id/update', async (req, res, next) => {
    const id = req.params.id;
    try {
        // Находим пост по id в базе данных
        const post = await PostSchema.findOne({ '_id': id });
        // Обновляем данные поста
        post.short_desc = 'New Text';
        post.full_desc = 'New Text full desc intel sintol kaffkoeak koeafk akofaekpo kopaef okpafkaf oaoaooa oaoooall';
        await post.save();
        // Формируем ответ для клиента
        const responseObj = {
            success: true,
            message: '',
            post: post || []
        };
        // Отправляем ответ клиенту
        res.status(200).json(responseObj);
    } catch (error) {
        // Выводим ошибку в консоль
        console.log(error);
        // Обрабатываем возможную ошибку и передаем ее дальше
        next(error);
    }
});


export default router;
