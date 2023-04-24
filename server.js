import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './controllers/users.js';
import postRoutes from './controllers/posts.js';
import commentRoutes from './controllers/comments.js';
import likeRoutes from './controllers/likes.js';
import { register, login } from './controllers/auth.js';

dotenv.config();

const app = express();
const port = 4000;

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
app.use('/register', register);
app.use('/login', login);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${port}`);
});
