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

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Создаем экземпляр Dropbox с помощью access token
const dbx = new Dropbox({accessToken: process.env.DROPBOX_ACCESS_TOKEN});

// Загрузчик файла с настройками хранения
const upload = multer();


app.post('/upload', cors(), upload.single('image'), (req, res) => {
    try {
        const file = req.file.buffer;
        const dropboxPath = '/uploads/' + req.file.originalname;
        dbx.filesUpload({path: dropboxPath, contents: file})
            .then(async (response) => {
                const directLinkResponse = await dbx.filesGetTemporaryLink({
                    path: response.result.path_display
                });
                res.json({url: directLinkResponse.result.link});
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