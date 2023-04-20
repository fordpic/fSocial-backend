import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './controllers/users.js';

dotenv.config();

const app = express();
const port = 4000;

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
app.use('/users', userRoutes);

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${port}`);
});
