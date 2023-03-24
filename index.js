import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';
import * as path from "path";

import {PostController, UserController} from './controllers/index.js';
import {loginValidation, postCreateValidation, registerValidation} from "./validations.js";
import {checkAuth, handleValidationErrors} from './utils/index.js';

mongoose.connect(
    process.env.REACT_APP_API_DB_URL,
).then(() => console.log('DB ok')).catch((err) => console.log('DB error', err));

const app = express();

// Настройки хранения загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media/uploads/'); // Папка для хранения загруженных файлов
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        cb(null, `${basename}-${Date.now()}${extension}`);
    },
});

// Загрузчик файла с настройками хранения
const upload = multer({storage});

// Метод для загрузки файла
app.post('/upload', cors(), upload.single('image'), (req, res) => {
    // Возвращаем URL загруженной картинки в качестве ответа на запрос
    const url = `${req.protocol}://${req.get('host')}/${req.file.path}`;`a`
    res.json({url: url});
});

app.use(cors());
app.use(express.json());

app.use('/media', express.static('media'));

app.post('/auth/login', cors(), loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/registration', cors(), registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', cors(), checkAuth, UserController.getMe)

// app.get('/tags',cors(), PostController.getLastTags);

app.get('/posts', cors(), PostController.getAll);
app.get('/posts/tags', cors(), PostController.getLastTags);
app.get('/posts/:id', cors(), PostController.getOne);
app.post('/posts', cors(), checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', cors(), checkAuth, PostController.remove);
app.patch('/posts/:id', cors(), checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started`);
});
