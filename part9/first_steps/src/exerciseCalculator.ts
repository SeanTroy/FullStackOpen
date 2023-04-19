import { checkNumber } from './utils'

export interface ReturnValues {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

interface ExerciseValues {
	hours: number[],
	target: number
}

const parseArguments = (args: string[]): ExerciseValues => {
	const errorMessage = `Error in submitted arguments.
	Please submit the daily training hours and then target hours in the following format:
	npm run calculateExercises '3, 0, 2.5, 2, 3.5, 2, 1' 2`
	if (args.length !== 4) throw new Error(errorMessage);

	const hours = args[2].split(',').map(h => {
		if (!checkNumber(h)) throw new Error(errorMessage);
		return Number(h);
	});
	if (!checkNumber(args[3])) throw new Error(errorMessage);

	return {
		hours: hours,
		target: Number(args[3])
	}
}

export const calculateExercises = (hours: number[], target: number): ReturnValues => {
	const periodLength = hours.length;
	const average = periodLength ? hours.reduce((a, b) => a + b, 0) / periodLength : 0;
	const trainingDays = hours.filter(h => h > 0).length;
	const success = average >= target;
	const rating = success ? 3 : average >= target / 2 ? 2 : 1;
	const ratingDescription = rating === 3
		? 'Excellent work, target met!'
		: rating === 2
			? "It's OK, you got over half the target hours. Cheer up!"
			: 'Come on, you can do better! Go for at least half next time!';
	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
};

try {
	const { hours, target } = parseArguments(process.argv);
	console.log(calculateExercises(hours, target));
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log('Error: ', error.message);
	}
}
