import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRequired from './middleware/authRequired.js';
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
app.use(
	cors({
		origin: '*',
	})
);

// Cookie Parser
app.use(cookieParser());

// Controllers
app.use('/register', register);
app.use('/login', login);
app.use('/users', authRequired, userRoutes);
app.use('/posts', authRequired, postRoutes);
app.use('/comments', authRequired, commentRoutes);
app.use('/likes', authRequired, likeRoutes);

// Let us know server is live
app.get(`/`, (req, res) => {
	res.send('Backend running, API is live');
});

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${port}`);
});

module.exports = app;
