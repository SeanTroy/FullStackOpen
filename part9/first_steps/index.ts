import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './src/bmiCalculator';
import { ReturnValues, calculateExercises } from './src/exerciseCalculator';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;
	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
		res.status(400).send({ error: 'malformatted parameters' });
	}
	const bmi = calculateBmi(Number(height), Number(weight));
	res.send({ weight: weight, height: height, bmi: bmi });
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { target, daily_exercises } = req.body;
	if (!target || !daily_exercises) {
		return res.status(400).send({ error: 'parameters missing' });
	}
	if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}
	try {
		const hours: number[] = daily_exercises.map((h: string) => {
			if (isNaN(Number(h))) throw new Error('malformatted parameters');
			return Number(h);
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const result: ReturnValues = calculateExercises(hours, Number(target));
		return res.send(result);
	} catch (error: unknown) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
