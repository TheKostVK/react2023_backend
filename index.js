import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import {loginValidation, postCreateValidation, registerValidation} from "./validations.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

import checkAuth from "./utils/checkAuth.js";

mongoose.connect(
    'mongodb+srv://TheKost:AD6-9PP-Vt9-n6D@cluster0.fkbk1nc.mongodb.net/blog?retryWrites=true&w=majority',
).then(() => console.log('DB ok')).catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'media/uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started`);
});
