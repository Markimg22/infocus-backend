import express from 'express';
import routes from './routes';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

mongoose.connect(String(process.env.DB_URL), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})
	.then(() => app.emit('connect'))
	.catch((e) => console.error(e));

app.use(express.json());
app.use(routes);
app.use(cors());

app.on('connect', () => {
	app.listen(3333, () => {
		console.log('Server started port 3333.');
	});
});
