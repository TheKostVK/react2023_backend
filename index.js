import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import {PostController, UserController} from './controllers/index.js';
import {loginValidation, postCreateValidation, registerValidation} from "./validations.js";
import {checkAuth, handleValidationErrors} from './utils/index.js';
import multer from 'multer';
import {Dropbox} from 'dropbox';
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


app.post('/upload', cors(), upload.single('image'), async (req, res) => {
    try {
        const file = req.file.buffer;
        const fileName = req.file.originalname;
        const extension = fileName.substring(fileName.lastIndexOf('.'));
        const randomString =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        const newFileName =
            fileName.replace(extension, '') + '_' + randomString + extension;
        const dropboxPath = `/uploads/${req.body.savePath}` + newFileName;

        const uploadResponse = await dbx.filesUpload({
            path: dropboxPath,
            contents: file,
        });

        const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
            path: uploadResponse.result.path_display,
            settings: {
                requested_visibility: {'.tag': 'public'},
            },
        });

        const downloadUrl = sharedLinkResponse.result.url.replace(
            'www.dropbox.com',
            'dl.dropboxusercontent.com'
        );

        res.json({url: downloadUrl});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Ошибка при выгрузке файла'});
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