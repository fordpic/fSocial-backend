import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './controllers/users.js';
import postRoutes from './controllers/posts.js';

dotenv.config();

const app = express();
const port = 4000;

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${port}`);
});
