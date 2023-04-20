import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors'; // Cross-origin resource sharing (CORS) middleware is required to allow requests from other origins
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});