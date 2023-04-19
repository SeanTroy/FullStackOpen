import { checkNumber } from "./utils"

interface BmiValues {
	height: number,
	weight: number
}

const parseArguments = (args: string[]): BmiValues => {
	const errorMessage = `Error in submitted arguments.
	Please submit the height and weight in the following format:
	npm run calculateBmi 180 74`
	if (args.length !== 4) throw new Error(errorMessage);
	if (!checkNumber(args[2]) || !checkNumber(args[3])) throw new Error(errorMessage);
	return {
		height: Number(args[2]),
		weight: Number(args[3])
	}
}

export const calculateBmi = (height: number, weight: number): string => {
	const index: number = weight / (height / 100) ** 2;

	if (index < 16)
		return 'Underweight (Severe thinness)';
	else if (index < 17)
		return 'Underweight (Moderate thinness)';
	else if (index < 18.5)
		return 'Underweight (Mild thinness)';
	else if (index < 25)
		return 'Normal range';
	else if (index < 30)
		return 'Overweight (Pre-obese)';
	else if (index < 35)
		return 'Obese (Class I)';
	else if (index < 40)
		return 'Obese (Class II)';
	else
		return 'Obese (Class III)';
};

try {
	const { height, weight } = parseArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log('Error: ', error.message);
	}
}
