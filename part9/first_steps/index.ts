import express from 'express';
const app = express();
import { calculateBmi } from './src/bmiCalculator';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query
	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
		res.status(400).send({ error: 'malformatted parameters' })
	}
	const bmi = calculateBmi(Number(height), Number(weight));
	res.send({weight: weight, height: height, bmi: bmi});
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
