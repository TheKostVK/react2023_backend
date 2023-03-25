import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import {PostController, UserController} from './controllers/index.js';
import {loginValidation, postCreateValidation, registerValidation} from "./validations.js";
import {checkAuth, handleValidationErrors} from './utils/index.js';
import multer from 'multer';
import {Dropbox} from 'dropbox';
import fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();


mongoose.connect(
    process.env.REACT_APP_API_DB_URL
).then(() => console.log('DB ok')).catch((err) => console.log('DB error', err));


const app = express();

app.use(cors());
app.use(express.json());

// Создаем экземпляр Dropbox с помощью access token
const dbx = new Dropbox({accessToken: process.env.DROPBOX_ACCESS_TOKEN});

// Загрузчик файла с настройками хранения
const upload = multer();

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


// Обрабатываем POST-запрос на загрузку файла
app.post('/upload', cors(), upload.single('image'), (req, res) => {
    try {
        const file = req.file.buffer;
        const dropboxPath = '/uploads/' + req.file.originalname;
        dbx.filesUpload({path: dropboxPath, contents: file})
            .then((response) => {
                if (response.result.hasOwnProperty('url')) {
                    const url = response.result.url;
                    res.json({url});
                } else {
                    res.status(500).json({error: 'Failed to get URL of uploaded file'});
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({error: 'Failed to upload file'});
            });
    } catch (err) {
        console.warn(err);
        res.status(400).json({error: 'Invalid request'});
    }
});

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