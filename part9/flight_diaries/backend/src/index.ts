import express from 'express';
const app = express();
import diaryRouter from './routes/diaries';
app.use(express.json());
import cors from 'cors'; // Cross-origin resource sharing (CORS) middleware is required to allow requests from other origins
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});