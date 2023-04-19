import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${port}`);
});
